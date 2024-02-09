import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="row"  id="about-us">
        <div className="col custom-footer-col1">
        <img style={{height:"45px"}} src="https://img.freepik.com/premium-photo/credit-card-laptop-computer_956369-6948.jpg?w=740" alt="" />
        <h3>Slash</h3>
        </div>
        <div className="col custom-footer-col2" >
          <h4 style={{color:"#8b8b8d"}}>About Us</h4>
          <p>At Slash, we believe in the power of <br /> ideas to inspire, inform, and transform. <br /> Our platform is more than just a blogging <br /> website; it's a space where creativity <br /> meets expression.</p>
        </div>
        <div className="col custom-footer-col3">
          <h4 style={{color:"#8b8b8d"}}>Contact Us</h4>
          <p style={{color:"#8b8b8d"}}>Subscribe to our newsletter</p>
          <form>
            <input type="text" placeholder='Email' />
            <button type="button" className="btn btn-success mt-3">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="row custom-footer-row2">
          <div className='custom-footer-divider'></div>
          <div className='custom-footer-row2-icons'>
          <a href="https://github.com/SaifAmjad" target='_blank'><img style={{height:"20px",width:"20px"}} src="https://cdn-icons-png.flaticon.com/128/919/919847.png" alt="" /></a>
          <a href="https://www.linkedin.com/in/saif-amjad-44779822a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"  target='_blank'><img style={{height:"20px",width:"20px"}} src="https://cdn-icons-png.flaticon.com/128/10092/10092249.png" alt="" /></a>
          <a href="https://www.instagram.com/saifx.00?igsh=MTg5d2lydG5zNDd1OA==" target='_blank'><img style={{height:"20px",width:"20px",backgroundColor:"#8b8b8d",borderRadius:"30px"}} src="https://cdn-icons-png.flaticon.com/128/1384/1384089.png" alt="" /></a>
          </div>
          <p>Developed by Saif Amjad 
            <br /> 
                 saifamjad03@gmail.com
          </p>
      </div>
    </>
  )
}

export default Footer
