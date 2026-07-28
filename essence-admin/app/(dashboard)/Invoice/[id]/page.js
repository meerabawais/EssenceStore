import Invoice from "@/components/admin/Invoice/Invoice";

export default async function page({params}){
    const {id} = await params;
    return <Invoice id={id}/>
}