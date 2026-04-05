import { Head, usePage } from '@inertiajs/react';
import InputField from "./input_field";
import Layout from "./layout";




/* Change title depends on authentication state*/
function Title(){
    if (!usePage().props.user) {
        return <Head title="Mini-chan2 - Guest" />;
    } else {
        return <Head title="Mini-chan2" />;
    }
}



export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return(
    <Layout>
        <Title/>

        <div className="fixed top-1/4 left-1/4 w-1/2">
            <h1 className="flex justify-center">Welcome</h1>
            <br />
            <InputField /> {/*form={form} onSubmit={onSubmit}/>*/}
        </div>
    </Layout>
    )
};