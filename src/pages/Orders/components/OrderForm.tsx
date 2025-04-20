// OrderForm.tsx
import { FC } from 'react';
import { FieldArray } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import BarcodeGenerator from './BarcodeGenerator';

const productOptions = [
  { label: 'Product A', value: 'PROD-A' },
  { label: 'Product B', value: 'PROD-B' },
  { label: 'Product C', value: 'PROD-C' },
];

type OrderFormProps = {
  values: {
    items: { product: string; quantity: number }[];
  };
  setFieldValue: (field: string, value: any) => void;
};

const OrderForm: FC<OrderFormProps> = ({ values, setFieldValue }) => {
  return (
    <FieldArray name="items">
      {({ push, remove }) => (
        <>
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => push({ product: '', quantity: 1 })}
              className="bg-purple-500 px-4 py-2 text-white rounded-md"
            >
              Add Product +
            </button>
          </div>

          {values?.items?.map((item, index) => (
            <div key={index} className="flex flex-wrap items-center gap-4 mb-4">
              {/* Product Dropdown */}
              <div className="flex-1 min-w-[200px]">
                <Dropdown
                  value={item.product}
                  options={productOptions}
                  onChange={(e) =>
                    setFieldValue(`items[${index}].product`, e.value)
                  }
                  placeholder="Select Product"
                  className="w-full"
                />
              </div>

              {/* Quantity Input */}
              <div className="w-32">
                <InputNumber
                  value={item.quantity}
                  onValueChange={(e) =>
                    setFieldValue(`items[${index}].quantity`, e.value ?? 1)
                  }
                  min={1}
                  showButtons
                  useGrouping={false}
                  placeholder="Qty"
                  className="w-full"
                />
              </div>

              {/* Remove Button */}
              <div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>

              {/* Barcode Preview */}
              {item.product && (
                <div className="w-32">
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
