import React, {useContext, useState, useEffect} from 'react'
import { userData } from '../App';
import { useNavigate } from 'react-router-dom';
import PdfViewerComponent from './PdfViewerComponent';

import Api from '../Api';
const Resume = () => {
    const navigate = useNavigate();
    const user = useContext(userData);
    const {http} = Api();
    const [resumeurl, setResumeUrl] = useState('');
    const [resumestr, setResumeString] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
      console.log('fff');
      if(!resumeurl){
        console.log('eee');
        fetchResume();
      } 
    },[]);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    // const getResumeUrl = () => {
    //   fetchResume();
    //   return resumeurl;
    // }

    const fetchResume = async () => {
      http.get('/resume',{user_id:user.user_id}).then((res)=>{
        console.log(res.data.pdfurl);
        //console.log(res.data.content);
        setResumeUrl(res.data.pdfurl);
        console.log('ffee'+resumeurl);
        //setResumeString(res.data.content.arrayBuffer());
      }).catch((error) => {
        if(error.response.status === 401){        
          navigate('/login');  
        }
      });
    }
    //'https://d11lgjnokvb2au.cloudfront.net/4/resume.pdf'
    return (
    <div>
      Resume     
      <div>
      {resumeurl.length > 0 &&
       <PdfViewerComponent document={resumeurl} />  
      }     
      </div> 
    </div>
  )
}

export default Resume