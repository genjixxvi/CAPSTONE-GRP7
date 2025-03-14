import axiosClient from "../../axiosClient"
import { Trash } from "lucide-react";

const deleteUser = ({userId}) => {
    const handleDelete = async () => {
        try {
            const response = await axiosClient.delete(`/user/delete/${userId}`)
            alert(response.data.message);
        } catch (error) {
            alert('Error Deleting User: ' + (error.response?.data?.error || error.message));
        };
    };

    return (
        <div className="flex items-center gap-x-4 align-center justify-center">
        <button 
            className="text-red-500 btn-destructive"
            onClick={handleDelete}
        >
            <Trash size={20} />
        </button>
    </div>
    )
}

export default deleteUser
