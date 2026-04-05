import { 
    Sidebar, 
    SidebarContent, 
    SidebarProvider, 
    SidebarTrigger  
} from "@/components/ui/sidebar";
import { Link } from '@inertiajs/react';
import { login, register, logout } from '@/routes';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';


/* Top bar which has two flex buttons.*/
function TopNavBar(){
    return(
        <>
            <div className="absolute top-0 w-full h-fit border border-input z-10">
                <div className="flex flex-row gap-0.5 justify-end">
                    { usePage().props.auth.user &&
                        <Button asChild variant="destructive">
                        <Link href={logout().url} method="post" as="button">Logout</Link>
                        </Button>
                    }

                    <Button asChild>
                    <Link href={login().url}>Login</Link>
                    </Button>

                    <Button asChild>
                    <Link href={register().url}>Register</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [past, setPast] = useState([])
    const auth = usePage();

    useEffect(() => {
        if (auth.props.auth.user) {
            axios.get('/past').then(res => setPast(res.data));
        }
    }, [auth]); // fetch users' uuids

    return (
        <>
        <SidebarProvider>
            <Sidebar>
              <SidebarContent>
                <Button className="mt-10" asChild>
                <Link href="/">New Chat</Link>
                </Button>

                {!auth.props.auth.user 
                    ?   <div>Register/Login for the chat threads to be stored.</div>
                    :   past.map((item) => (
                        <div key={item._uuid} className="hover:shadow-xl">
                        <Link href={`/chat/${item._uuid}`}>{item.title}</Link>
                        </div>
                ))}
              </SidebarContent>
            </Sidebar>

            <TopNavBar />
            <main>
                <SidebarTrigger className="mt-10"/>
                {children}
            </main>
        </SidebarProvider>
        </>
    );
}
