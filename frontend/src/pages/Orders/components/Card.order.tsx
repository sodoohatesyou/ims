import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsPrinter } from 'react-icons/bs';
import { Button } from 'primereact/button';
import { toast } from 'sonner';
import { useDeleteOrderMutation } from '../../../provider/queries/Orders.query';
import ShowAndPrintModel from './ShowAndPrint.model';
import { ConfirmDialog } from 'primereact/confirmdialog';

const TableCard = ({ data, id }: any) => {
  const [deleteOrder, deleteRes] = useDeleteOrderMutation();
  const [visible, setVisible] = useState(false);

  const deleteHandler = async (_id: string) => {
    try {
      const { data, error }: any = await deleteOrder(_id);
      if (error) {
        toast.error(error.data.message);
        return;
      }
      toast.success(data.msg);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {id}
        </th>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {data?.consumer?.name}
        </th>
        <td className="px-6 py-4">{data?.consumer?.email}</td>
        <td className="px-6 py-4">
          <ul>
            {data.items.length > 0 &&
              data.items.map((cur: any, i: number) => (
                <li key={i}>
                  {cur?.name} - ₮{cur?.price}
                </li>
              ))}
          </ul>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => setVisible(!visible)}
            title="View"
            className="p-4 bg-teal-500 text-white rounded-sm mx-2"
          >
            <BsPrinter className="text-xl" />
          </button>
          <Button
            loading={deleteRes.isLoading}
            onClick={() => deleteHandler(data._id)}
            title="delete"
            className="p-4 bg-red-500 text-white rounded-sm mx-2"
          >
            <FaRegTrashAlt className="text-xl" />
          </Button>
        </td>
      </tr>

      <ShowAndPrintModel id={data._id} visible={visible} setVisible={setVisible} />
      <ConfirmDialog id="order.queries" />
    </>
  );
};

export default TableCard;
