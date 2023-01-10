import React, { useState } from 'react'

const Template = (props) => {
  const [templateName, setTemplateName] = useState('f1');

  const saveTemplate = () => {
    props.setCurrentNav('basicinfo');
    props.setCurrentTemplate(templateName);
    console.log(templateName);
  }

  return (
    <div className='container'>
      All Templates <br/>
      Choose a resume layout that you like, you can customize it later on.
      <div className='row'>
        <div className='col-mb'>
          <div className=''>
            <button onClick={() => setTemplateName('f1')}>
                <img src={process.env.PUBLIC_URL+"/images/Fresher1-1634027291.png"} />
            </button>
          </div>
        </div>
        <div className='col-mb'>
          <div className=''>
              <button onClick={() => setTemplateName('e1')}>
                <img src={process.env.PUBLIC_URL+"/images/Experienced1-1634036987.png"} />
            </button>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          
        </div>
        <div className='col'>
          <button type="button" className="btn btn-success" onClick={saveTemplate}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Template