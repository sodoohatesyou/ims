// OrderForm.tsx
import { FieldArray } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import BarcodeGenerator from './BarcodeGenerator';

const productOptions = [
  { label: 'Product A', value: 'PROD-A' },
  { label: 'Product B', value: 'PROD-B' },
  { label: 'Product C', value: 'PROD-C' },
];

const OrderForm = ({ values, setFieldValue }: any) => {
  return (
    <FieldArray name="items">
      {({ push, remove }) => (
        <>
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => push({ product: '', quantity: 1, price: 0 })}
              className="bg-purple-500 px-4 text-white py-2 rounded-md"
            >
              Add Product +
            </button>
          </div>

          {values.items.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <div className="w-full">
                <Dropdown
                  value={item.product}
                  options={productOptions}
                  onChange={(e) => setFieldValue(`items[${index}].product`, e.value)}
                  placeholder="Select Product"
                  className="w-full"
                />
              </div>

              <div className="w-32">
                <InputNumber
                  value={item.quantity}
                  onValueChange={(e) => setFieldValue(`items[${index}].quantity`, e.value)}
                  min={1}
                  showButtons
                  placeholder="Qty"
                  className="w-full"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>

              {item.product && (
                <div className="barcode-preview w-32">
                  <BarcodeGenerator value={item.product} height={40} />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </FieldArray>
  );
};

export default OrderForm;
