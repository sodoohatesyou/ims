import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik, FieldArray } from 'formik';
import { toast } from 'sonner';
import * as yup from 'yup';
import { useGetForSearchUserQuery } from '../../../provider/queries/Users.query';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FaTrashAlt } from "react-icons/fa";
import Loader from '../../../components/Loader';
import moment from 'moment';
import { useCreateOrderMutation } from '../../../provider/queries/Orders.query';
import BarcodeGenerator from '../../../components/BarcodeGenerator';

type AddOrderModelProps = {
    visible: boolean;
    setVisible: (val: boolean) => void;
};

const AddOrderModel = ({ visible, setVisible }: AddOrderModelProps) => {
    const [CreateOrder] = useCreateOrderMutation();
    const { isLoading, isFetching, data } = useGetForSearchUserQuery({});

    if (isLoading || isFetching) return <Loader />;

    const userTemplate = (option: any) => (
        <div className="flex align-items-center">
            <div className="capitalize">{option.name} - {moment(option.dob).format("L")}</div>
        </div>
    );

    const validationSchema = yup.object({
        user: yup.mixed().required("User is required"),
        items: yup.array().of(
            yup.object({
                name: yup.string().required("Name is required"),
                price: yup.number().required("Price is required").min(0, "Price must be positive"),
                quantity: yup.number().required("Quantity is required").min(1, "Minimum quantity is 1")
            })
        )
    });

    const initialValues = {
        user: null,
        items: []
    };

    const onSubmitHandler = async (values: any, { resetForm }: any) => {
        try {
            const payload = { ...values, user: values.user._id };
            const { data, error }: any = await CreateOrder(payload);

            if (error) {
                toast.error(error.data.message);
                return;
            }

            console.log(data);
            resetForm();
            setVisible(false);
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <Dialog
            draggable={false}
            header="Add Order"
            position="top"
            visible={visible}
            className="w-full md:w-[70%] lg:w-[60%]"
            onHide={() => setVisible(false)}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="w-full">
                        {/* User Dropdown */}
                        <div className="mb-3">
                            <label>User <span className="text-red-500 text-sm">*</span></label>
                            <Dropdown
                                value={values.user}
                                onChange={(e) => setFieldValue('user', e.value)}
                                filterBy="name"
                                options={data?.users || []}
                                filterPlaceholder="Search User By Name"
                                optionLabel="name"
                                placeholder="Select a User"
                                emptyFilterMessage="No User Found"
                                emptyMessage="You Have No User"
                                filter
                                valueTemplate={userTemplate}
                                itemTemplate={userTemplate}
                                className="w-full my-2 border outline-none ring-0"
                            />
                            <ErrorMessage name="user" component="p" className="text-red-500 capitalize" />
                        </div>

                        {/* Items Array */}
                        <div className="mb-3">
                            <label>Items <span className="text-red-500 text-sm">*</span></label>
                            <FieldArray name="items">
                                {({ push, remove }) => (
                                    <>
                                        <div className="mb-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => push({ name: '', price: '', quantity: 1 })}
                                                className="bg-purple-500 px-4 text-white py-2 rounded-md"
                                            >
                                                Add +
                                            </button>
                                        </div>

                                        {values.items.map((item, i) => (
                                            <div className="flex flex-wrap items-center gap-4 mb-4" key={i}>
                                                <div className="w-full md:w-[30%]">
                                                    <Field
                                                        name={`items[${i}].name`}
                                                        className="w-full border outline-none py-3 px-4"
                                                        placeholder="Item Name"
                                                    />
                                                </div>

                                                <div className="w-full md:w-[20%]">
                                                    <Field
                                                        type="number"
                                                        name={`items[${i}].price`}
                                                        className="w-full border outline-none py-3 px-4"
                                                        placeholder="Item Price"
                                                    />
                                                </div>

                                                <div className="w-full md:w-[20%]">
                                                    <Field
                                                        type="number"
                                                        name={`items[${i}].quantity`}
                                                        className="w-full border outline-none py-3 px-4"
                                                        placeholder="Quantity"
                                                        min={1}
                                                    />
                                                </div>

                                                <div className="w-[10%]">
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(i)}
                                                        className="px-3 py-3 rounded-full bg-black text-white"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>

                                                {/* Barcode */}
                                                {item.name && (
                                                    <div className="mt-2 w-full">
                                                        <BarcodeGenerator value={item.name} height={50} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                            <ErrorMessage name="items" component="p" className="text-red-500 capitalize" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Button type="submit" className="text-white px-5 bg-indigo-500 py-3 rounded-sm">
                                Add Consumer
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

export default AddOrderModel;
