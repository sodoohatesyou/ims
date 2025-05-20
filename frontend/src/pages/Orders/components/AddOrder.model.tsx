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

const AddOrderModel = ({ visible, setVisible }: any) => {
    const [CreateOrder] = useCreateOrderMutation();
    const { isLoading, isFetching, data } = useGetForSearchUserQuery({});

    if (isLoading || isFetching) {
        return <Loader />;
    }

    const selectedCountryTemplate = (option: any, props: any) => {
        return option ? (
            <div className="flex align-items-center">
                <div className='capitalize'>{option.name} - {moment(new Date(option.dob)).format("L")}</div>
            </div>
        ) : (
            <span>{props.placeholder}</span>
        );
    };

    const countryOptionTemplate = (option: any) => (
        <div className="flex align-items-center">
            <img
                alt={option.name}
                src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                className="mr-2 flag"
                style={{ width: '18px' }}
            />
            <div>{option.name} - {moment(new Date(option.dob)).format("L")}</div>
        </div>
    );

    const validationSchema = yup.object({
        user: yup.mixed().required("User is required"),
    });

    const initialValues = {
        user: null,
        items: [],
    };

    const onSubmitHandler = async (values: any, { resetForm }: any) => {
        try {
            const { data, error }: any = await CreateOrder({
                ...values,
                user: values.user._id
            });

            if (error) {
                toast.error(error.data.message);
                return;
            }

            console.log(data);
            resetForm();
            setVisible(false);
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <Dialog
            draggable={false}
            header="Захиалга нэмэх"
            position="top"
            visible={visible}
            className="w-full md:w-[70%] lg:w-[60%]"
            onHide={() => setVisible(false)}
        >
            <Formik
                onSubmit={onSubmitHandler}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-3">
                            <label>User <span className="text-red-500 text-sm">*</span></label>
                            <Dropdown
                                value={values.user}
                                onChange={(e) => setFieldValue('user', e.value)}
                                filterBy="name"
                                options={data?.users}
                                filterPlaceholder="Хэрэглэгчээ нэрээр хайх"
                                optionLabel="user"
                                placeholder="Select a User"
                                emptyFilterMessage="Хэрэглэгч олдсонгүй"
                                emptyMessage="Танд хэрэглэгч байхгүй"
                                filter
                                valueTemplate={selectedCountryTemplate}
                                itemTemplate={countryOptionTemplate}
                                className="w-full my-2 border outline-none ring-0"
                            />
                            <ErrorMessage name="user" className="text-red-500 capitalize" component="p" />
                        </div>

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

                                        {values.items.length > 0 &&
                                            values.items.map((item, i) => (
                                                <div key={i} className="w-full flex items-center justify-between gap-x-4 mb-2">
                                                    <div className="w-1/3">
                                                        <Field
                                                            name={`items[${i}].name`}
                                                            className="w-full my-2 border outline-none py-3 px-4"
                                                            placeholder="Бар код"
                                                        />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <Field
                                                            type="number"
                                                            name={`items[${i}].price`}
                                                            className="w-full my-2 border outline-none py-3 px-4"
                                                            placeholder="Үнэ"
                                                        />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <Field
                                                            type="number"
                                                            name={`items[${i}].quantity`}
                                                            className="w-full my-2 border outline-none py-3 px-4"
                                                            placeholder="Тоо хэмжээ"
                                                            min={1}
                                                        />
                                                    </div>
                                                    <div className="w-[50px] flex justify-center items-center">
                                                        <button
                                                            onClick={() => remove(i)}
                                                            type="button"
                                                            className="p-3 rounded-full bg-black text-white"
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </div>
                                                    {item.name && (
                                                        <div className="w-full mt-2">
                                                            <BarcodeGenerator value={item.name} height={50} />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </>
                                )}
                            </FieldArray>
                            <ErrorMessage name="items" className="text-red-500 capitalize" component="p" />

                            {values.items.length > 0 && (
                                <div className="mt-4 text-right font-semibold text-lg">
                                    Total Quantity: {values.items.reduce((acc, item) => acc + Number(item.quantity || 0), 0)}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="text-white px-5 rounded-sm bg-indigo-500 py-3">
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
