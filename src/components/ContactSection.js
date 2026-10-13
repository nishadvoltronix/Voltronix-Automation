import React from 'react';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import './ContactSection.css';

const FORM_ACTION = 'https://forms.zohopublic.com/voltronixswitchgearllc/form/voltronixAutomation/formperma/YT6va1ChFCU6iOsfov8fj0MSudlE_Ja8wePmkl_i-nI/htmlRecords/submit';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section"><div className="container contact-layout">
      <div className="contact-copy">
        <span className="eyebrow">Get in touch</span><h2>Let’s build your<br/><span>next project.</span></h2>
        <p>Tell us about your control-panel or automation requirement. Our team will review the details and get back to you.</p>
        <div className="contact-details">
          <a href="tel:+971504327804"><Phone/><span><small>Call us</small>+971 50 432 7804</span></a>
          <a href="mailto:info@voltronix.ae"><Mail/><span><small>Email us</small>info@voltronix.ae</span></a>
          <div><MapPin/><span><small>Visit us</small>Shed 06, Aber Warehouse, DIP 02, Dubai, UAE</span></div>
          <a href="https://wa.me/971504327804" target="_blank" rel="noreferrer"><MessageCircle/><span><small>WhatsApp</small>Start a conversation</span></a>
        </div>
      </div>
      <form className="contact-form" action={FORM_ACTION} method="POST" acceptCharset="UTF-8">
        <input type="hidden" name="zf_referrer_name" value=""/><input type="hidden" name="zf_redirect_url" value=""/><input type="hidden" name="zc_gad" value=""/>
        <div className="field-row"><label>First name<input type="text" name="Name_First" placeholder="First name" maxLength="255" required/></label><label>Last name<input type="text" name="Name_Last" placeholder="Last name" maxLength="255" required/></label></div>
        <div className="field-row"><label>Email<input type="email" name="Email" placeholder="you@company.com" maxLength="255" required/></label><label>Company<input type="text" name="SingleLine" placeholder="Company name" maxLength="255" required/></label></div>
        <div className="field-row"><label>Phone<div className="phone-field"><input aria-label="Country code" name="PhoneNumber1_countrycodeval" value="+971" readOnly/><input aria-label="Phone number" name="PhoneNumber1_countrycode" placeholder="50 000 0000" inputMode="numeric" pattern="[0-9 ]{9,12}" maxLength="12" required/></div></label><label>Service<select name="Radio" defaultValue="" required><option value="" disabled>Select a service</option><option>Installation</option><option>Replacements</option><option>Upgrades</option><option>Repairs</option><option>Solutions</option><option value="zfs-others-zfs">Other</option></select></label></div>
        <label>Project details<textarea name="MultiLine" rows="5" placeholder="Tell us about your project, site and timeline." maxLength="65535" required/></label>
        <button type="submit">Send enquiry <ArrowRight size={17}/></button><p className="form-note">Your enquiry is submitted securely through our existing Zoho form.</p>
      </form>
    </div></section>
  );
}
