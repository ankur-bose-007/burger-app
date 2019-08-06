import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component{   
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false      
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP CODE'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false      
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false      
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false      
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    validation:null,
                    value:'fastest',
                    valid:true   
                }
        },
        formIsValid:false,
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const formData={};
        for(let fromElementIdentifier in this.state.orderForm){
            formData[fromElementIdentifier]=this.state.orderForm[fromElementIdentifier];
        }
        const orders={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderData:formData
        }
        axios.post('/orders.json',orders).then(response=>{
            this.setState({loading:false});
            this.props.history.push('/');
        }).catch(error=>{
            this.setState({loading:false});
        }); 
    }

    checkValidity(value,rules){
        let isValid=false;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid=value.trim()!=='';
        }

        return isValid;
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        

        let formIsValid=true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier].valid&&formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }
    render(){
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement=>(
                        <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
                    ))}
                    <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form=<Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;