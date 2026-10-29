import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, Zap } from 'lucide-react';
import site from '../data/site.json';
import './ContactSection.css';
import './ContactSectionZoho.css';

const ZOHO_ACTION = 'https://forms.zohopublic.com/voltronixswitchgearllc/form/voltronixAutomation/formperma/YT6va1ChFCU6iOsfov8fj0MSudlE_Ja8wePmkl_i-nI/htmlRecords/submit';
const requestTypes = ['Installation', 'Replacements', 'Upgrades', 'Repairs', 'Solutions'];

function PhoneField({ name, label, autoComplete }) {
  return (
    <div className="zf-tempFrmWrapper">
      <label className="zf-labelName" htmlFor={`${name}_countrycode`}>{label} <span className="required-mark">*</span></label>
      <div className="zf-phwrapper">
        <input type="text" name={`${name}_countrycodeval`} value="+971" readOnly aria-label={`${label} country code`} autoComplete="tel-country-code" />
        <input type="tel" id={`${name}_countrycode`} name={`${name}_countrycode`} required maxLength={9} pattern="[0-9]{9}" inputMode="tel" autoComplete={autoComplete} placeholder="9 digits, without +971" title="Enter the 9-digit UAE number without +971 or a leading zero."
          onPaste={(event) => {
            event.preventDefault();
            let digits = event.clipboardData.getData('text').replace(/\D/g, '');
            if (digits.startsWith('00971')) digits = digits.slice(5);
            else if (digits.startsWith('971') && digits.length === 12) digits = digits.slice(3);
            if (digits.startsWith('0') && digits.length === 10) digits = digits.slice(1);
            event.currentTarget.value = digits.slice(0, 9);
          }} />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [requestType, setRequestType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    const reset = () => setSubmitting(false);
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-container">
        <div className="section-header">
          <div className="section-badge"><Zap className="badge-icon" aria-hidden="true" /><span>Contact Voltronix Automation</span></div>
          <h2 id="contact-title" className="section-title">Discuss Your <span className="gradient-text">Control Panel Project</span></h2>
          <p className="section-subtitle">Send your drawings, load schedule or requirements for a quotation. We support industrial and building-services projects in Dubai and across the UAE.</p>
        </div>
        <div className="contact-cards">
          <a className="contact-card" href={`tel:${site.phone}`}><Phone className="contact-icon" aria-hidden="true" /><div className="contact-card-text"><h3>Phone</h3><p>{site.phone}</p></div></a>
          <a className="contact-card" href={`mailto:${site.email}`}><Mail className="contact-icon" aria-hidden="true" /><div className="contact-card-text"><h3>Email</h3><p>{site.email}</p></div></a>
          <a className="contact-card" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="contact-icon" aria-hidden="true" /><div className="contact-card-text"><h3>WhatsApp</h3><p>Chat about your requirements</p></div></a>
        </div>
        <div className="contact-form-wrap voltronix-zoho-form">
          <form className="zf-templateWrapper" action={ZOHO_ACTION} name="form" id="quotation-form" aria-labelledby="quotation-title" method="POST" acceptCharset="UTF-8" encType="multipart/form-data"
            onInvalid={() => setInvalid(true)} onSubmit={() => { setInvalid(false); setSubmitting(true); }}>
            <input type="hidden" name="zf_referrer_name" value="" />
            <input type="hidden" name="zf_redirect_url" value="" />
            <input type="hidden" name="zc_gad" value="" />
            {['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].map((name) => <input key={name} type="hidden" name={name} value="" />)}
            <h3 id="quotation-title" className="zf-frmTitle">Request a quotation</h3>
            <p className="form-required-hint">Fields marked * are required.</p>
            <div className="form-row">
              <div className="zf-tempFrmWrapper"><label htmlFor="quote-first-name">First name *</label><input id="quote-first-name" name="Name_First" type="text" maxLength={255} autoComplete="given-name" required /></div>
              <div className="zf-tempFrmWrapper"><label htmlFor="quote-last-name">Last name *</label><input id="quote-last-name" name="Name_Last" type="text" maxLength={255} autoComplete="family-name" required /></div>
            </div>
            <div className="form-row">
              <div className="zf-tempFrmWrapper"><label htmlFor="quote-email">Email address *</label><input id="quote-email" name="Email" type="email" maxLength={255} autoComplete="email" required /></div>
              <div className="zf-tempFrmWrapper"><label htmlFor="quote-company">Company name *</label><input id="quote-company" name="SingleLine" type="text" maxLength={255} autoComplete="organization" required /></div>
            </div>
            <div className="form-row">
              <PhoneField name="PhoneNumber" label="Telephone number" autoComplete="tel-national" />
              <PhoneField name="PhoneNumber1" label="Mobile number" autoComplete="mobile tel-national" />
            </div>
            <p className="form-phone-hint">UAE numbers: enter 9 digits after +971, without a leading zero.</p>
            <fieldset className="quote-request-types">
              <legend>What service are you looking for? *</legend>
              <div className="zf-overflow">
                {requestTypes.map((type, index) => <label key={type} className="zf-radioChoice"><input type="radio" name="Radio" value={type} required={index === 0} checked={requestType === type} onChange={() => setRequestType(type)} />{type}</label>)}
                <label className="zf-radioChoice"><input type="radio" name="Radio" value="zfs-others-zfs" checked={requestType === 'zfs-others-zfs'} onChange={() => setRequestType('zfs-others-zfs')} />Other</label>
              </div>
              <div className="zf-tempFrmWrapper"><label htmlFor="quote-other-service">Other service {requestType === 'zfs-others-zfs' ? '*' : '(optional)'}</label><input id="quote-other-service" type="text" name="Radio_allow_others_text" maxLength={150} required={requestType === 'zfs-others-zfs'} /></div>
            </fieldset>
            <div className="zf-tempFrmWrapper"><label htmlFor="quote-message">Project requirements *</label><textarea id="quote-message" name="MultiLine" maxLength={65535} rows={5} placeholder="Panel type, quantities, electrical ratings and required delivery date…" required /></div>
            {invalid && <p className="form-error" role="alert">Please complete the required fields and check your email and phone numbers.</p>}
            <button className="zf-submitColor" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Send Enquiry'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
