import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../Api'; 
import { userData } from '../App';

const Basicinfo = (props) => {
  const {http} = Api();
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const errRef = useRef();  
  const user = useContext(userData);

  const inputValues = {
    user_id:user.user_id,
    fullname:'',
    phonenumber:'',
    emailid:'',
    profiletitle:'',
    state:'',
    city:'',
    zipcode:'',
    profiledescription:'',
  }
  const [inputs, setInputs] = useState(inputValues);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    inputRef.current['fullname'].focus();
    fetchData(); 
  },[]);

  const fetchData = () => {  
    if (localStorage.getItem("userData") === null) {
      http.get('/basicinfo',{params:{user_id: inputs.user_id}}).then((res)=>{     
        setInputs({
          user_id:inputs.user_id,
          fullname:res.data.full_name,
          phonenumber:res.data.phone_number,
          emailid:res.data.email_id,
          profiletitle:res.data.profile_title,
          state:res.data.state,
          city:res.data.city,
          zipcode:res.data.zipcode,
          profiledescription:res.data.profile_description,
        });
        const returnValues = {
          user_id:user.user_id,
          fullname:res.data.full_name,
          phonenumber:res.data.phone_number,
          emailid:res.data.email_id,
          profiletitle:res.data.profile_title,
          state:res.data.state,
          city:res.data.city,
          zipcode:res.data.zipcode,
          profiledescription:res.data.profile_description,
        }
        localStorage.setItem('userData',JSON.stringify(returnValues));
      }).catch((error) => {
        if(error.response.status === 401){        
          navigate('/login');  
        }
      });
    } else {
      const sdata = localStorage.getItem('userData');
      const sessionUserData = JSON.parse(sdata);
      setInputs({
        user_id:sessionUserData.user_id,
        fullname:sessionUserData.fullname,
        phonenumber:sessionUserData.phonenumber,
        emailid:sessionUserData.emailid,
        profiletitle:sessionUserData.profiletitle,
        state:sessionUserData.state,
        city:sessionUserData.city,
        zipcode:sessionUserData.zipcode,
        profiledescription:sessionUserData.profiledescription,
      });
    } 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const saveBasicInfo = () => {
    http.post('/basicinfo',
      { 
        user_id:inputs.user_id,
        full_name:inputs.fullname,
        phone_number:inputs.phonenumber,
        profile_title:inputs.profiletitle,
        email_id:inputs.emailid,
        state:inputs.state,
        city:inputs.city,
        zipcode:inputs.zipcode,
        profile_description:inputs.profiledescription,
      }).then((res)=>{
        localStorage.setItem('userData',JSON.stringify(inputs));
        props.setCurrentNav('yourresume');
      }).catch((error) => {
        if(error.response.status === 401){        
          navigate('/login');  
        }
      }); 
  }

  return (
    <div className='container'>
      <h4>Basic Information </h4>
      <p ref={errRef} className={errMsg ? "error" : ""} aria-live="assertive">
      {errMsg}
      </p>
      <div className='row clsBasicInfo'>
        <div className='col-mb'>
          <section>
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col'>
                  <label htmlFor="fullname">Full Name</label>
                  <input 
                    type="text" 
                    id="fullname" 
                    className='form-control'
                    ref={el => inputRef.current['fullname'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value = {inputs.fullname || ''}
                    required
                  />
                </div>
                <div className='col'>
                  <label htmlFor="phonenumber">Phone Number</label>
                  <input 
                    type="text" 
                    id="phonenumber" 
                    className='form-control'
                    ref={el => inputRef.current['phonenumber'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value = {inputs.phonenumber || ''}
                    required
                  />
                </div>          
              </div>
              <div className='row'>
                <div className='col'>
                  <label htmlFor="profiletitle">Title</label>
                  <input 
                    type="text" 
                    id="profiletitle" 
                    className='form-control'
                    ref={el => inputRef.current['profiletitle'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value = {inputs.profiletitle || ''}
                    required
                  />
                </div>
                <div className='col'>
                  <label htmlFor="emailid">Email Id</label>
                  <input 
                    type="email" 
                    id="emailid" 
                    className='form-control'
                    ref={el => inputRef.current['emailid'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value = {inputs.emailid || ''}
                    required
                  />
                </div>          
              </div>
              <div className='row'>
                <div className='col'>
                  <label htmlFor="state">State</label>
                  <input 
                    type="text" 
                    id="state" 
                    className='form-control'
                    ref={el => inputRef.current['state'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value = {inputs.state || ''}
                    required
                  />
                </div>
                <div className='col'>
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    className='form-control'
                    ref={el => inputRef.current['city'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value = {inputs.city || ''}
                    required
                  />
                </div>          
                <div className='col'>
                  <label htmlFor="zipcode">Zip Code</label>
                  <input 
                    type="text" 
                    id="zipcode" 
                    className='form-control'
                    ref={el => inputRef.current['zipcode'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    value = {inputs.zipcode || ''}
                    required
                  />
                </div>          
              </div>
              <div className='row'>
                <div className='col'>
                  <label htmlFor='profiledescription'>About</label>
                  <textarea 
                    id="profiledescription"
                    className='form-control'
                    ref={el => inputRef.current['profiledescription'] = el}
                    autoComplete="off"
                    onChange={handleInputChange}
                    required
                    value={inputs.profiledescription || ''}
                  />
                </div>
              </div>
              <br/>
              <div className='row'>
                <div className='col'>                  
                  <div className="clsDivButtons" >
                    <button className="btn btn-success rounded" type="button"  onClick={() =>  props.setCurrentNav('template')}>Back </button>
                    <button className="btn btn-success rounded" type="button"  onClick={saveBasicInfo}>Save & Next </button>
                  </div>
                </div>
                {/* <div className='col'>
                  <button type="button" className="btn btn-success" onClick={saveBasicInfo}>Save</button>
                </div> */}
              </div>
            </form>   
          </section>
        </div>
      </div>
    </div>
  )
}

export default Basicinfo