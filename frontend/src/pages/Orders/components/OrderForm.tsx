<<<<<<< HEAD
// OrderForm.tsx (frontend)
=======
// OrderForm.tsx
import { FieldArray, Field } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import BarcodeGenerator from './BarcodeGenerator';

const productOptions = [
  { label: 'Product A', value: 'PROD-A' },
  { label: 'Product B', value: 'PROD-B' },
  { label: 'Product C', value: 'PROD-C' },
];

>>>>>>> 184fa8d6d6219d6d20aeec3a3e9315ebe45bcba8
const OrderForm = ({ values, setFieldValue }: any) => {
  return (
    <FieldArray name="items">
      {({ push, remove }) => (
        <>
          <div className="mb-3 flex justify-end">
            <button
              type="button"
<<<<<<< HEAD
              onClick={() => push({ product: '', quantity: 1, price: 0 })}
=======
              onClick={() => push({ product: '', quantity: 1 })}
>>>>>>> 184fa8d6d6219d6d20aeec3a3e9315ebe45bcba8
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
<<<<<<< HEAD
                  onChange={(e) => setFieldValue(`items[${index}].product`, e.value)}
=======
                  onChange={(e) =>
                    setFieldValue(`items[${index}].product`, e.value)
                  }
>>>>>>> 184fa8d6d6219d6d20aeec3a3e9315ebe45bcba8
                  placeholder="Select Product"
                  className="w-full"
                />
              </div>

              <div className="w-32">
                <InputNumber
                  value={item.quantity}
<<<<<<< HEAD
                  onValueChange={(e) => setFieldValue(`items[${index}].quantity`, e.value)}
=======
                  onValueChange={(e) =>
                    setFieldValue(`items[${index}].quantity`, e.value)
                  }
>>>>>>> 184fa8d6d6219d6d20aeec3a3e9315ebe45bcba8
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
<<<<<<< HEAD
=======

export default OrderForm;
>>>>>>> 184fa8d6d6219d6d20aeec3a3e9315ebe45bcba8
