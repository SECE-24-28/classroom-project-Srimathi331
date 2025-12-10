import FooterItem from "./FooterItem";
const Footer=()=>{
    const footerLinks=[
    {label:"About Us"},
    {label:"Contact"},
    {label:"Terms & Consitions"},
    {label:"Privacy Policy"}
    ];
    
    return (
        <div>
            <footer>
                <p>© 2025 RechaGO App. All Rights Reserved.</p>
                <ul>
                    {footerLinks.map((item,index)=>
                    {
                        <FooterItem key={index} label={item.label} />
                    })}
                </ul>
            </footer>
        </div>
    );
}

export default Footer;