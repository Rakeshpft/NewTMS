import React from 'react'
import CreateNewCustomerForm from './createNewCustomerForm';
import { useParams } from 'react-router-dom';
// import CommonLayOut from '../../../layout';
// import CreateNewCustomerForm from './createNewCustomerForm';
// import { ICustomerDetails, initialStateCustomer } from '../../../services/tms-objects/customer.types';
// import { useCustomerContext } from '../../../services/reducer/customer.reducer';
// import { useNavigate } from 'react-router-dom';
// import { routes } from '../../routes/routes';



const CreateNewCustomerPage = ( ) => {

    const param = useParams();
    const customer_id = param.id == undefined ? 0 : parseInt(param.id,10);
    return (
        <CreateNewCustomerForm customer_id={customer_id} />
    );
}


export default CreateNewCustomerPage;