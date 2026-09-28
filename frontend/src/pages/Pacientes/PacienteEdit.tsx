import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, checkbox, checkmark, closeSharp, pencil, search, searchCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removePaciente, savePaciente, searchPaciente } from './PacienteApi';

import { Country, City } from 'country-state-city';



const PacienteEdit: React.FC = () => {

  const { name = '', id } = useParams<{ name: string; id:string }>();
  const [paciente, setPaciente] = useState<any>({});

  useEffect(()=>{
    search();
  }, []);

  const search = () =>{
    //let result = searchPaciente();
    //setPacientes(result);
  }

  const save = () =>{
    debugger;
    savePaciente(paciente);
  }

  
  // Guardamos las listas completas en estados
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  // Guardamos los valores seleccionados por el usuario
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  // 1. Cargamos todos los países una sola vez al montar el componente
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // 2. Cada vez que cambie el país seleccionado, actualizamos la lista de ciudades
  useEffect(() => {
    if (selectedCountryCode) {
      const countryCities = City.getCitiesOfCountry(selectedCountryCode);
      setCities(countryCities || []);
    } else {
      setCities([]);
    }
    // Reseteamos el selector de ciudades para evitar datos inconsistentes
    setSelectedCity('');
  }, [selectedCountryCode]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        

            <IonCard>
                <IonTitle >{id === 'new' ? 'Agregar Cliente' : 'Editar Cliente'}</IonTitle>

                <IonItem>
                    <IonTitle>Datos de identificacion y seguro</IonTitle>
                </IonItem>
                

                <IonRow>
                    
                    <IonCol>
                        <IonItem>
                            <IonInput onIonChange={e => paciente.id = e.detail.value} 
                            label="Nº Historia Clinica" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonSelect placeholder='Seguro Medico' labelPlacement="stacked">
                                <IonSelectOption value="Si">Si</IonSelectOption>
                                <IonSelectOption value="No">No</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput onIonChange={e => paciente.id = e.detail.value} 
                            label="Codigo Afiliciacion SIS" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonSelect placeholder='Selecciona un sexo' labelPlacement='stacked'>
                                <IonSelectOption value="Masculino">Masculino</IonSelectOption>
                                <IonSelectOption value="Femenino">Femenino</IonSelectOption>
                                <IonSelectOption value="Otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonDatetime >
                              
                            
                            </IonDatetime>
                        </IonItem>
                    </IonCol>
                
                </IonRow>
                    <IonItem>
                        <IonTitle>Ubicacion y domicilio</IonTitle>
                    </IonItem>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonSelect value={selectedCountryCode} onIonChange={e => setSelectedCountryCode(e.detail.value)} 
                            label="Pais">
                                {countries.map((country)=>(
                                    <IonSelectOption key={country.isoCode} value={country.isoCode}>
                                        {country.flag} {country.name}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>

                        <IonItem disabled={!selectedCountryCode}>
                            <IonLabel position='stacked'>Ciudad</IonLabel>
                            <IonSelect placeholder='Ciudad' value={selectedCity} onIonChange={e => setSelectedCity(e.detail.value)}>
                                {cities.map((city, index)=>(
                                    <IonSelectOption key={`${city.name}-${index}`} value={city.name}>
                                        {city.name}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                </IonRow>
                    <IonItem>
                        <IonTitle>Establecimiento de origen y destino</IonTitle>
                    </IonItem>      
                <IonRow>
                    <IonCol>
                        <IonDatetimeButton>
                            <IonInput onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="" labelPlacement="stacked"></IonInput>
                        </IonDatetimeButton>
                    </IonCol>

                    <IonCol>
                        <IonItem>
                            <IonInput onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="Establecimiento de Origen" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                
                    <IonCol>
                        <IonItem>
                            <IonInput onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="Establecimiento de Destino" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>

                
                </IonRow>
                    <IonItem>
                        <IonTitle>Resumen Historia Clinica</IonTitle>
                    </IonItem>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonTextarea rows={3} onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="Anamnesis" labelPlacement="stacked"></IonTextarea>
                        </IonItem>
                    </IonCol>

                    <IonCol>
                        <IonItem>
                            <IonTextarea rows={3} onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="Examen fisico" labelPlacement="stacked"></IonTextarea>
                        </IonItem>
                    </IonCol>

                    <IonCol>
                        <IonItem>
                            <IonTextarea rows={3} onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="Examenes auxiliares" labelPlacement="stacked"></IonTextarea>
                        </IonItem>
                    </IonCol>

                    <IonCol>
                        <IonItem>
                            <IonTextarea rows={3} onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="Diagnosticos" labelPlacement="stacked"></IonTextarea>
                        </IonItem>
                    </IonCol>

                    
                    <IonCol>
                        <IonItem>
                            <IonTextarea rows={3} onIonChange={e => paciente.apmaterno = e.detail.value}
                            label="Tratamiento" labelPlacement="stacked"></IonTextarea>
                        </IonItem>
                    </IonCol>

                </IonRow>
                    <IonItem>
                        <IonTitle>Datos de la referencia</IonTitle>
                    </IonItem>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonSelect placeholder='UPS Destino' labelPlacement='stacked'>
                                <IonSelectOption value={"conExterna"}>Consulta Externa</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Emergencia</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonSelect placeholder='Especialidad de Destino' labelPlacement='stacked'>
                                <IonSelectOption value={"conExterna"}>Pediatria</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Medicina</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Cirugia</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Gineco-Obst</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Lab</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Dx. Imag.</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonSelect placeholder='Cond. Paciente al inicio del traslado' labelPlacement='stacked'>
                                <IonSelectOption value={"conExterna"}>Estable</IonSelectOption>
                                <IonSelectOption value={"conExterna"}>Mal Estado</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonCol>
                </IonRow>
                    <IonItem>
                        <IonTitle>Personal Responsable</IonTitle>
                    </IonItem>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput 
                            label="Colegiatura" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput
                            label="Apellido Paterno" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput
                            label="Apellido Materno" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput
                            label="Nombre" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                    <IonItem>
                        <IonTitle>
                            Responsable del Establecimiento
                        </IonTitle>
                    </IonItem>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput 
                            label="Colegiatura" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput
                            label="Apellido Paterno" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput
                            label="Apellido Materno" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput
                            label="Nombre" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>               
                    <IonCol>
                        <IonItem>
                            <IonInput
                            label="Mo" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>
                    <IonCol>
                        <IonItem>
                            <IonInput onIonChange={e => paciente.celular = e.detail.value}
                            label="Celular" labelPlacement="stacked"></IonInput>
                        </IonItem>
                    </IonCol>

                </IonRow>


                <IonItem>
                    <IonButton onClick={save} color={'success'} fill='solid' slot='end' size='default'>
                        <IonIcon icon={checkmark}/>
                        Guardar
                    </IonButton>
                </IonItem>

            </IonCard>  
    </IonContent>
    </IonPage>
  );
};

export default PacienteEdit;
