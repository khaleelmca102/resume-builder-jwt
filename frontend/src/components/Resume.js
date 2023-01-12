import React, {useContext, useState, useEffect} from 'react'
import { userData } from '../App';
import { useNavigate } from 'react-router-dom';
import PdfViewerComponent from './PdfViewerComponent';

import Api from '../Api';
const Resume = (props) => {
    const navigate = useNavigate();
    const user = useContext(userData);
    const {http} = Api();
    const [resumeurl, setResumeUrl] = useState('');
   
    useEffect(() => {
      if(!resumeurl){
        fetchResume();
      } 
    });

    const fetchResume = async () => {
      http.get('/resume',{user_id:user.user_id}).then((res)=>{
        console.log(res.data.pdfurl);
        setResumeUrl(res.data.pdfurl);
        console.log('ffee'+resumeurl);
      }).catch((error) => {
        if(error.response.status === 401){        
          navigate('/login');  
        }
      });
    }
    //'https://d11lgjnokvb2au.cloudfront.net/4/resume.pdf'
    return (   
    <div className='container'>
     <h4>Resume</h4>
     <p></p>
     <div className='row'>
       <div className='col-mb'>
         <div className=''>
          {resumeurl.length > 0 &&
          <PdfViewerComponent document={resumeurl} />  
          }  
         </div>
       </div>
     </div>
     <div className="clsDivButtons" >
       <button className="btn btn-success rounded" type="button" onClick={() =>  props.setCurrentNav('basicinfo')}>Back </button>
       <button className="btn btn-success rounded" type="button" >Save & Download </button>
     </div>
    </div>
  )
}

export default Resume