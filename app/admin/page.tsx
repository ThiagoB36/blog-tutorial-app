"use client"

import { NextPage } from "next";
import AdminLayput from "../components/layout/AdminLayout";


interface Props {}

const Admin: NextPage<Props> = () => {
    return <div>
        <AdminLayput>
            <div>This is admin</div>
        </AdminLayput>
    </div>
};

export default Admin;