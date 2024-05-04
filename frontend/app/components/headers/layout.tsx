import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div> {/* Corrected class here */}
        <AppRouterCacheProvider>
            {children}
        </AppRouterCacheProvider>
    </div>
);

export default Layout;