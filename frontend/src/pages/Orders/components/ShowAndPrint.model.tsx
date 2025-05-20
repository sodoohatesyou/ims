// ShowAndPrintModel.tsx
import { Dialog } from 'primereact/dialog';
import { useGetInvoiceByIdQuery } from '../../../provider/queries/Orders.query';
import Loader from '../../../components/Loader';
import moment from 'moment';
import Barcode from 'react-barcode';
import { usePDF } from 'react-to-pdf';

const ShowAndPrintModel = ({ setVisible, visible, id }: any) => {
  const { data, isLoading, isError, isFetching } = useGetInvoiceByIdQuery(id);
  const { toPDF, targetRef } = usePDF();

  if (isLoading || isFetching) return <Loader />;
  if (isError) return <>Something went wrong</>;

  // Calculate total price and total quantity
  const totalPrice = data.items?.reduce(
    (acc: number, item: any) => acc + Number(item.price) * (item.quantity || 1),
    0
  );
  const totalQuantity = data.items?.reduce(
    (acc: number, item: any) => acc + (item.quantity || 1),
    0
  );

  return (
    <Dialog
      draggable={false}
      visible={visible}
      className="w-[90%] mx-auto lg:mx-0 lg:w-1/2"
      onHide={() => setVisible(false)}
    >
      <div ref={targetRef} className="m-0 px-5">
        <div className="flex items-start gap-x-10 py-5 justify-between">
          <div className="w-1/2 flex flex-col gap-y-2">
            <h1 className="font-semibold text-xl capitalize">{data?.consumer?.name}</h1>
            <p className="text-sm">{data?.consumer?.address}</p>
            <p className="font-semibold">Date: {moment(new Date(data.createdAt)).format('lll')}</p>
          </div>
          <div className="w-1/2 text-right">
            <Barcode displayValue={false} width={1} height={50} value={data?._id} />
            <h1 className="font-semibold">Supplier: {data?.user?.name}</h1>
          </div>
        </div>

        <div className="items py-2">
          <table className="border w-full">
            <thead className="border">
              <tr>
                <th className="border py-2">#</th>
                <th className="border py-2">Item</th>
                <th className="border py-2">Price (₮)</th>
                <th className="border py-2">Qty</th>
              </tr>
            </thead>
            <tbody>
              {data.items &&
                data.items.length > 0 &&
                data.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border text-center py-2">{index + 1}</td>
                    <td className="border text-center py-2 capitalize">{item.name}</td>
                    <td className="border text-center py-2">₮ {item.price}</td>
                    <td className="border text-center py-2">{item.quantity || 1}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2} className="border text-center py-2 font-semibold">
                  Total
                </th>
                <th className="border text-center py-2 font-semibold">₮ {totalPrice} /-</th>
                <th className="border text-center py-2 font-semibold">{totalQuantity}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <footer className="pt-4">
        <button
          className="px-6 py-2 outline-none bg-red-500 rounded-md text-white"
          onClick={() =>
            toPDF({
              method: 'open',
              page: {
                format: 'A4',
              },
            })
          }
        >
          Generate
        </button>
      </footer>
    </Dialog>
  );
};

export default ShowAndPrintModel;
