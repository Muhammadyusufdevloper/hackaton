import { message } from "antd";
import { memo, useEffect, useState } from "react";
import "./car-create.scss";
import { useCreateCarMutation } from "../../../../context/api/carApi";

const initialState = {
    davlat_raqami: "",
    model: "",
    nomi: "",
    turi: "",
    dvigitel_raqami: "",
    ot_kuchi: "",
    rangi: "",
    mashina_yili: "",
};

const CarCreate = () => {
    const [carData, setCarData] = useState(initialState);
    const [messageApi, contextHolder] = message.useMessage();
    const [createCar, { isLoading, isSuccess }] = useCreateCarMutation();

    useEffect(() => {
        if (isSuccess) {
            setCarData(initialState);
        }
    }, [isSuccess]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { davlat_raqami, model, nomi, turi, dvigitel_raqami, ot_kuchi, rangi, mashina_yili } = carData;

        if (davlat_raqami && model && nomi && turi && dvigitel_raqami && ot_kuchi && rangi && mashina_yili) {
            try {
                await createCar(carData).unwrap();
                messageApi.success({
                    content: 'Car created successfully!',
                    duration: 3,
                    style: { marginTop: '2px' },
                });
            } catch (error) {
                messageApi.error({
                    content: 'Failed to create car. Please try again!',
                    duration: 3,
                    style: { marginTop: '2px' },
                });
            }
        } else {
            messageApi.error({
                content: 'Please fill in all fields!',
                duration: 3,
                style: { marginTop: '2px' },
            });
        }
    };

    return (
        <>
            {contextHolder}
            <div className="car-create">
                <div className="car-create__wrapper container">
                    <h1 className="car-create__title">Create Car</h1>
                    <form onSubmit={handleFormSubmit} className="car-create__form">
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="davlat_raqami">Davlat Raqami</label>
                            <input
                                name="davlat_raqami"
                                value={carData.davlat_raqami}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="davlat_raqami"
                                type="text"
                                placeholder="Enter car's state number"
                                required
                            />
                        </div>
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="model">Model</label>
                            <input
                                name="model"
                                value={carData.model}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="model"
                                type="text"
                                placeholder="Enter car model"
                                required
                            />
                        </div>
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="nomi">Nomi</label>
                            <input
                                name="nomi"
                                value={carData.nomi}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="nomi"
                                type="text"
                                placeholder="Enter car name"
                                required
                            />
                        </div>
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="turi">Turi</label>
                            <input
                                name="turi"
                                value={carData.turi}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="turi"
                                type="text"
                                placeholder="Enter car type"
                                required
                            />
                        </div>
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="dvigitel_raqami">Dvigitel Raqami</label>
                            <input
                                name="dvigitel_raqami"
                                value={carData.dvigitel_raqami}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="dvigitel_raqami"
                                type="text"
                                placeholder="Enter engine number"
                                required
                            />
                        </div>
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="ot_kuchi">Ot Kuchi</label>
                            <input
                                name="ot_kuchi"
                                value={carData.ot_kuchi}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="ot_kuchi"
                                type="number"
                                placeholder="Enter horsepower"
                                required
                            />
                        </div>
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="rangi">Rangi</label>
                            <input
                                name="rangi"
                                value={carData.rangi}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="rangi"
                                type="text"
                                placeholder="Enter car color"
                                required
                            />
                        </div>
                        <div className="car-create__card">
                            <label className="car-create__label" htmlFor="mashina_yili">Mashina Yili</label>
                            <input
                                name="mashina_yili"
                                value={carData.mashina_yili}
                                onChange={handleInputChange}
                                className="car-create__input"
                                id="mashina_yili"
                                type="number"
                                placeholder="Enter car year"
                                required
                            />
                        </div>

                        <div className="car-create__button-wrapper">
                            <button
                                type="submit"
                                className="car-create__button"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Create Car"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default memo(CarCreate);
