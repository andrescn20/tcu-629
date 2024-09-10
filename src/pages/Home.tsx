import React from "react";
import Layout from "../components/Layout";
import { DefaultButton, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

interface ISection {
  nombre: string;
  descripcion: string;
  textoBoton: string;
  url: string;
}
const sections: ISection[] = [
  {
    nombre: "Panel General",
    descripcion:
      "En esta sección podrá ver todos los dispositivos registrados en el sistema. Para cada uno de ellos podrá ver la información recolectada y otras características importantes",
    textoBoton: "Visitar",
    url: "/general",
  },
  {
    nombre: "Configuración",
    descripcion:
      "En esta sección se configuran los dispositivos físicos que utilizan los dispositivos. Aquí podrá agregar sensores los microcontroladores, así como eliminarlos y revisar información importante. Esta sección solo está disponible para adminsitradores del sistema",
    textoBoton: "Visitar",
    url: "/configuracion",
  },
  {
    nombre: "Dispositivos",
    descripcion:
      'En esta sección se puedne agregar nuevos dispositivos al sistema, como calendatores solares o dispensadores de alcohol. Este es el proceso que debe realizarse para poder monitorear el dispositivo. Es imprtante notar que los dispositivos requieren de sensores y microcontroladores disponibles, que deben ser previamente agregados en la sección de "Configuración"',
    textoBoton: "Visitar",
    url: "/agregardispositivo",
  },
];
const HomeSections = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl flex flex-col space-y-2">
      {sections.map((section, index) => {
        return (
          <div className="w-full border-2 p-4 rounded-md" key={section.nombre}>
            <h3 className="font-bold">{section.nombre}</h3>
            <p>{section.descripcion}</p>
            <div className="flex justify-end">
                <PrimaryButton onClick={() => navigate(section.url)}>{section.textoBoton}</PrimaryButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col my-4 bg-right bg-contain bg-no-repeat justify-center items-center">
        <h1 className="text-xl font-bold text-center"> Monitoreo de Dispositivos</h1>
        <h2 className="text-lg text-center"> Hogar de Ancianos de Palmares </h2>
      </div>
      <div className="flex-grow flex flex-col w-full items-center">{HomeSections()}</div>
    </Layout>
  );
};

export default Home;
