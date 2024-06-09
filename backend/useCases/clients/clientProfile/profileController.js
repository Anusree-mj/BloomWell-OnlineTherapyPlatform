import clientProfileQuery from "../../../infrastructure/dbQueries/client/clientProfileQuery.js";

// edit profile 
const editPersonalInfoController = async (req, res) => {
    try {
        console.log('reached profile')
        const clientId = req.user._id
        const personalInfo = req.body.personalInfo;

        const response = await clientProfileQuery.editClientPersonalInfo(clientId, personalInfo);
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            res.status(400).json({ status: 'nok', message: 'Something went wrong' });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}


export {
    editPersonalInfoController,
}