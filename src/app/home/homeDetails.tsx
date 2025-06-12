import Input from "../components/form/input/InputField";
import TableWrapper from "../components/form/input/TableWrapper";
import Label from "../components/form/Label";

interface HomeDetailsProps {
    data?: any;
}
export default function HomeDetails({ data }: HomeDetailsProps) {
    return (
        <div>
            <div>
                <p>Name</p>
                <Input />
            </div>
            <div>
                <p>Email</p>
                <Input />
            </div>
        </div>
    )

}
