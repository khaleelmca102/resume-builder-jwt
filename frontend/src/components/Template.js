import React, { useEffect, useState, useRef } from 'react'

const Template = (props) => {
  const [templateName, setTemplateName] = useState('f1');
  const templateRef = useRef([]);

  const saveTemplate = () => {
    props.setCurrentNav('basicinfo');
    props.setCurrentTemplate(templateName);
  }

  useEffect(() => {
    if(templateName === 'f1'){
      templateRef.current['templatef1'].classList.add("active");      
      templateRef.current['templatee1'].classList.remove("active");
    }
    if(templateName === 'e1'){
      templateRef.current['templatee1'].classList.add("active");
      templateRef.current['templatef1'].classList.remove("active");
    }
  },[templateName]);


  return (
    <div className='container'>
      <h4>All Templates</h4>
      <p>Choose a resume layout that you like, you can customize it later on.</p>
      <div className='row'>
        <div className='col-mb clsTemplateImg'>
          <div className=''>
            <button onClick={() => setTemplateName('f1')}>
                <img 
                  id="templatef1" 
                  alt="Fresher Template 1"
                  src={process.env.PUBLIC_URL+"/images/Fresher1-1634027291.png"} 
                  ref={el => templateRef.current['templatef1'] = el}
                  className=""
                />
            </button>
          </div>
        </div>
        <div className='col-mb clsTemplateImg'>
          <div className=''>
              <button onClick={() => setTemplateName('e1')} >
                <img 
                  id="templatee1" 
                  alt="Experinced Template 1"
                  src={process.env.PUBLIC_URL+"/images/Experienced1-1634036987.png"} 
                  ref={el => templateRef.current['templatee1'] = el}
                  className=""
                />
            </button>
          </div>
        </div>
      </div>
      <div className="clsDivButtons" >
				<button className="btn btn-success rounded" type="button" onClick={saveTemplate}>Save & Next </button>
			</div>
    </div>
  )
}

export default Template