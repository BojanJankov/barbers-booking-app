import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import CalendarWithTerms from "../../Components/CalendarWithTerms/CalendarWithTerms";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ServiceFormValues {
  name: string;
  price: number;
}

const EditBarberPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBarberById, foundBarber } = useContext(BarberContext);
  const [isOpenServiceForm, setIsOpenServiceForm] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<ServiceFormValues>({
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (id) {
      getBarberById(Number(id));
    }
  }, []);

  const handleEditBarber = () => {
    navigate(`/edit-barber/form/${foundBarber?.id}`);
  };

  const onAddServiceClick = () => {
    setIsOpenServiceForm(true);
  };

  const onHandleServiceAdd = async (data: ServiceFormValues) => {
    try {
      console.log("data pred req:", data);

      await api.post("services", {
        name: data.name,
        price: Number(data.price),
        barberId: foundBarber?.id,
      });
      console.log("Uspesno dodaden service");
      reset({
        name: "",
        price: 0,
      });
      setIsOpenServiceForm(false);

      if (foundBarber?.id) {
        getBarberById(foundBarber?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleDeleteService = async (serviceId: number) => {
    try {
      await api.delete(`services/${serviceId}`);

      console.log("Service deleted");

      getBarberById(Number(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-font p-6 space-y-10">
      <section className="bg-mid rounded-2xl p-6 shadow-lg border border-font space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-font">
          {t("edit-barber-info-title")}
        </h2>
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-border shadow-md">
          <img
            src={foundBarber?.image}
            alt={foundBarber?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-3 text-lg sm:text-xl text-center mb-10">
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-name")}
            </span>{" "}
            {foundBarber?.name}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-bussinesName")}
            </span>{" "}
            {foundBarber?.bussinesName}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-email")}
            </span>{" "}
            {foundBarber?.email}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-city")}
            </span>{" "}
            {foundBarber?.city}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-address")}
            </span>{" "}
            {foundBarber?.address}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-experience")}
            </span>{" "}
            {foundBarber?.experience}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-phoneNumber")}
            </span>{" "}
            {foundBarber?.phoneNumber}
          </p>
          <p>
            <span className="font-semibold text-light text-xl sm:text-2xl">
              {t("edit-barber-info-description")}
            </span>{" "}
            {foundBarber?.description}
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handleEditBarber}
            className="px-6 py-2 rounded-lg bg-light hover:bg-border text-font transition-all shadow-md cursor-pointer"
          >
            {t("edit-barber-info-button-text")}
          </button>
        </div>
      </section>
      <div className="border p-6 rounded-lg bg-mid">
        <h2 className="text-2xl font-bold mb-4 text-font">
          {t("edit-barber-manage-terms-title")}
        </h2>
        {foundBarber && foundBarber.id && (
          <CalendarWithTerms barberId={foundBarber.id} />
        )}
      </div>
      <div className="border p-6 rounded-lg bg-mid">
        <h2 className="text-2xl font-bold mb-4 text-font">
          {t("edit-barber-manage-services-title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-5">
          {(foundBarber?.services ?? []).map((service) => (
            <div
              key={service.id}
              className="bg-dark text-font p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold">{service.name}</h3>
              <p className="text-m">Price: {service.price}$</p>
              <button
                className="bg-dark text-font p-1 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  onHandleDeleteService(service.id);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
        <button
          className="bg-dark border-border text-font p-2 rounded hover:bg-light cursor-pointer"
          onClick={onAddServiceClick}
        >
          {t("edit-barber-add-service-button")}
        </button>
        {isOpenServiceForm && (
          <form
            className="flex flex-col gap-4 max-w-md mx-auto bg-dark p-6 shadow-md rounded-lg"
            method="POST"
            action=""
            onSubmit={handleSubmit((data) => {
              onHandleServiceAdd(data);
            })}
          >
            <h2 className="text-xl text-font font-semibold text-center">
              {t("edit-barber-service-form-title")}
            </h2>
            <input
              type="text"
              placeholder={t(
                "edit-barber-service-form-serviceName-placeholder"
              )}
              {...register("name", { required: true })}
              className="border border-border text-font p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
              required
            />
            <input
              type="number"
              placeholder={t("edit-barber-service-form-price-placeholder")}
              {...register("price", { required: true })}
              className="border border-border text-font p-3 rounded focus:outline-none focus:ring-2 focus:ring-border"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-mid border-border text-font font-semibold py-3 rounded hover:bg-light transition cursor-pointer"
            >
              {t("edit-barber-service-form-button-text")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBarberPage;
