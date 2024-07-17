import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTherapistsPaymentsAction, adminStateType } from "@/store/admin/adminReducer";
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import TableComponent from "@/components/common/tableComponent";
import { apiCall } from "@/services/api";
import { toast } from "react-toastify";
import { adminAuth } from "@/utilities/auth";

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

const AdminPayment = () => {
    const dispatch = useDispatch();
    const paymentDetails = useSelector((state: { admin: adminStateType }) => state.admin.paymentDetails);
    const adminData = useSelector((state: { admin: adminStateType }) => state.admin.admin);
    const router = useRouter();
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

    useEffect(() => {
        dispatch(getTherapistsPaymentsAction());

        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            setIsRazorpayLoaded(true);
        };
        script.onerror = () => {
            console.error("Failed to load Razorpay script");
            setIsRazorpayLoaded(false);
        };
        document.body.appendChild(script);
    }, [dispatch, router]);

    const handlePayment = async (therapistId: string, totalAmount: number, totalClients: number,
        totalLiveSessions: number
    ) => {
        try {
            const response = await apiCall({
                method: 'POST',
                endpoint: `admin/therapists/payment`,
                body: { therapistId, totalAmount, totalClients, totalLiveSessions }
            });

            if (response.status === 'ok' && response.paymentDetails) {
                razorpayPayment(response.paymentDetails, response.therapistId);
            } else {
                toast.error(`Failed to do the payment. Please try again!`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const razorpayPayment = (order: { id: string; amount: number }, therapistId: string) => {
        if (!isRazorpayLoaded) {
            toast.error("Razorpay is not loaded. Please try again later.");
            return;
        }

        const options: any = {
            key_id: 'rzp_test_mj8FaMjD2VYPW4',
            amount: order.amount,
            currency: "INR",
            name: "BloomWell",
            description: "Test Transaction",
            image: "/logo.png",
            order_id: order.id,
            handler: function (response: RazorpayPaymentResponse) {
                verifyPayment(response, order, therapistId);
            },
            prefill: {
                name: 'Emily',
                contact: 9876567896,
            },
            notes: {
                address: 'user.address',
            },
            theme: {
                color: "#3399cc",
            },
        };

        const Razorpay = (window as any).Razorpay;
        if (Razorpay) {
            const rzp1 = new Razorpay(options);
            rzp1.open();
        } else {
            console.error("Razorpay is not defined");
        }
    };

    const verifyPayment = async (payment: RazorpayPaymentResponse, order: { id: string; amount: number }, therapistId: string): Promise<void> => {
        try {
            const response = await apiCall({
                method: 'PUT',
                endpoint: `admin/therapists/verify/payment`,
                body: { payment, order, therapistId }
            });

            if (response.status === 'ok') {
                dispatch(getTherapistsPaymentsAction());
                toast.success('Payment successful!');
            } else {
                toast.error(`Failed to make purchase. Please try again!`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const columns: GridColDef[] = [
        { field: "slNo", headerName: "Sl.No", width: 50 },
        { field: "name", headerName: "Name", width: 120 },
        { field: "totalClient", headerName: "Total Clients", width: 110 },
        { field: "totalLiveSessions", headerName: "Total Live Sessions", width: 150 },
        { field: "total", headerName: "Total Amount", width: 110 },
        { field: "paymentStatus", headerName: "Payment Status", width: 130 },
        {
            field: "pay",
            headerName: "Proceed",
            sortable: false,
            width: 160,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    disabled={params.row.paymentStatus === 'Completed' || params.row.totalClient === 0}
                    onClick={() => handlePayment(params.row.id, params.row.totalAmount, params.row.totalClients,
                        params.row.totalLiveSessions
                    )}
                >
                    Pay
                </Button>
            ),
        },
    ];
    const calculateTotalAmount = (totalClient: any, totalLiveSession: any) => {
        let totalAmount = 0;
        totalAmount = ((totalClient ?? 0) * 200) + ((totalLiveSession ?? 0) * 300);
        return totalAmount;
    }
    const rows = paymentDetails.map((item, index) => ({
        id: item._id,
        slNo: index + 1,
        name: item.name,
        totalClient: item.totalClients ? item.totalClients : 0,
        totalLiveSessions: item.totalLiveSessionPerMonth ? item.totalLiveSessionPerMonth : 0,
        totalAmount: calculateTotalAmount(item.totalClients, item.totalLiveSessionPerMonth),
        total: `₹ ${calculateTotalAmount(item.totalClients, item.totalLiveSessionPerMonth)}/-`,
        paymentStatus: item.isMonthlyPaid ? 'Completed' : 'Pending',
        pay: 'PAY'
    }));
    const head = 'Manage Payments';
    const subHead = [
        { name: `Total Earnings : ₹${adminData.totalEarnings}/-`, url: '#', select: false, imp: true },
    ]
    return (
        <Box sx={{ ml: { xs: 'none', sm: '15rem' }, mt: 5 }}>

            <TableComponent rows={rows} columns={columns} head={head} subHead={subHead} role="admin" />
        </Box>
    );
}
export default AdminPayment;
