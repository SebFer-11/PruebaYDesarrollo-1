import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, closeSharp, pencil, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';


const PacienteList: React.FC = () => {

  const { name = '' } = useParams<{ name: string; }>();

  const [pacientes, setPacientes] = useState<any>([]);

  useEffect(()=>{
    search();
  }, []);

  const search = () =>{
    const datosDeEjemplo = [
        {
            id: '1',
            nombre: 'Jose Sebastian',
            appaterno: 'Fernandez',
            apmaterno: 'Pari',
            celular: '312654987',
            direccion: 'Av Siempre Viva',
            estadocita: 'En curso'
        },
        {
            id: '2',
            nombre: 'Jorge Andre',
            appaterno: 'Gamarra',
            apmaterno: 'Santiesteban',
            celular: '123456789',
            direccion: 'Jr Union',
            estadocita: 'Sin cita'
        }
    ]
    setPacientes(datosDeEjemplo)
  }

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
                <IonTitle >Gestión de Clientes</IonTitle>

                <IonItem>
                    <IonButton color={'primary'} fill='solid' slot='end' size='default'>
                        <IonIcon icon={add}/>
                        Agregar Paciente
                    </IonButton>
                </IonItem>

                <IonGrid className='table'>
                    <IonRow>
                        <IonCol>Nombre</IonCol>
                        <IonCol>Apellido Paterno</IonCol>
                        <IonCol>Apellido Materno</IonCol>
                        <IonCol>Nro Celular</IonCol>
                        <IonCol>Dirección</IonCol>
                        <IonCol>Estado de Cita Médica</IonCol>



                        <IonCol>Acciones</IonCol>
                    </IonRow>
                

                    {pacientes.map((pacientes:any)=>
                      <IonRow>
                        <IonCol>{pacientes.nombre}</IonCol>
                        <IonCol>{pacientes.appaterno}</IonCol>
                        <IonCol>{pacientes.apmaterno}</IonCol>
                        <IonCol>{pacientes.celular}</IonCol>
                        <IonCol>{pacientes.direccion}</IonCol>
                        <IonCol>{pacientes.estadocita}</IonCol>

                        <IonCol>
                            <IonButton color={'primary'} fill='clear'>
                                <IonIcon icon={pencil} slot='icon-only'/>
                            </IonButton>
                            <IonButton color={'danger'} fill='clear'>
                                <IonIcon icon={closeSharp} slot='icon-only'/>
                            </IonButton>
                        </IonCol>
                      </IonRow>
                    )}

                </IonGrid>
            </IonCard>


    </IonContent>
    </IonPage>
  );
};

export default PacienteList;
