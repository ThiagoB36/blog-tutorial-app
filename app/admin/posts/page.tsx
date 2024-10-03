"use client"

import { NextPage } from "next";
import AdminLayput from "../../components/layout/AdminLayout";

interface Props {}

const Posts: NextPage<Props> = () => {
    return <AdminLayput>
        <div>Posts</div>
        </AdminLayput>
}

export default Posts;