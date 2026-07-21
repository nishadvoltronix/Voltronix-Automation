import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Send, Zap } from 'lucide-react';
import './ContactSection.css';
import './ContactSectionZoho.css';
import { postToAppsScript } from '../chatbot/submitForm';

const CONTACT_TYPES = [
  'PLC Panel',
  'VFD Panel',
  'MCC Assembly',
  'BMS Panel',
  'Safety & ESD Panel',
  'Other',
];

const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL'; // placeholder (replaced in submitForm.js)

const ContactSection = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: 'PLC Panel',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const quickContacts = useMemo(
    () => ({
      whatsapp: 'https://wa.me/971504327804', // TODO: replace with real WhatsApp number
      phone: '+971504327804', // TODO: replace with real company phone
      email: 'info@voltronix.ae', // TODO: replace with real company email
    }),
    []
  );

  // Zoho form handles validation & submission (kept state for existing UI cards only)
  useEffect(() => {
    // no-op
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg">
        <div className="contact-grid" />
        <div className="contact-orb orb-1" />
        <div className="contact-orb orb-2" />
      </div>

      <div className="contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <Zap className="badge-icon" />
            <span>Contact Voltronix Automation</span>
          </div>
          <h2 className="section-title">
            Powering Industry Through <span className="gradient-text">Automation</span>
          </h2>
          <p className="section-subtitle">
            Contact Voltronix Automation today to discuss your industrial control panel and automation requirements.
          </p>
        </motion.div>

        <div className="contact-top">
          <motion.div
            className="contact-cards"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-card">
              <Phone className="contact-icon" />
              <div className="contact-card-text">
                <h3>Phone</h3>
                <p>{quickContacts.phone}</p>
              </div>
            </div>
            <div className="contact-card">
              <Mail className="contact-icon" />
              <div className="contact-card-text">
                <h3>Email</h3>
                <p>{quickContacts.email}</p>
              </div>
            </div>
            <div className="contact-card">
              <MessageCircle className="contact-icon" />
              <div className="contact-card-text">
                <h3>WhatsApp</h3>
                <p>+971504327804</p>
              </div>
            </div>

            <div className="contact-actions">
              <a
                className="btn-primary contact-whatsapp"
                href={quickContacts.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <span>Chat on WhatsApp</span>
              </a>
              <button className="btn-secondary" onClick={scrollToContact} type="button">
                <span>Contact Form</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="voltronix-zoho-form">
              <form
                action="https://forms.zohopublic.com/voltronixswitchgearllc/form/voltronixAutomation/formperma/YT6va1ChFCU6iOsfov8fj0MSudlE_Ja8wePmkl_i-nI/htmlRecords/submit"
                name="form"
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();

                  const formEl = e.currentTarget;

                  const invalidClass = 'vx-client-error';
                  const setInvalid = (el) => {
                    if (!el) return;
                    el.classList.add(invalidClass);
                  };

                  const clearInvalid = () => {
                    formEl.querySelectorAll('.' + invalidClass).forEach((el) => el.classList.remove(invalidClass));
                    formEl.querySelectorAll('.vx-zoho-error').forEach((el) => el.classList.remove('vx-zoho-error'));
                  };

                  clearInvalid();

                  const getByName = (name) => formEl.querySelector(`[name="${name}"]`);
                  const getValue = (name) => {
                    const el = getByName(name);
                    return el ? String(el.value || '').trim() : '';
                  };

                  const getRadioChecked = () => {
                    const radios = formEl.querySelectorAll('input[type="radio"][name="Radio"]');
                    for (const r of radios) {
                      if (r.checked) return r;
                    }
                    return null;
                  };

                  let isValid = true;

                  const requiredTextNames = [
                    'Name_First',
                    'Name_Last',
                    'Email',
                    'SingleLine',
                    'PhoneNumber_countrycodeval',
                    'PhoneNumber_countrycode',
                    'PhoneNumber1_countrycodeval',
                    'PhoneNumber1_countrycode',
                    'MultiLine',
                  ];

                  for (const name of requiredTextNames) {
                    const el = getByName(name);
                    const val = getValue(name);
                    if (!val) {
                      isValid = false;
                      setInvalid(el);
                    }
                  }

                  // Phone UX constraints:
                  // - national number must be exactly 9 digits (not less)
                  const enforce9Digits = (name, expectedLen = 9) => {
                    const el = getByName(name);
                    if (!el) return;

                    const val = String(el.value || '').replace(/\D/g, '');
                    // If user typed something but length is not enough => mark red
                    if (val && val.length !== expectedLen) {
                      isValid = false;
                      setInvalid(el);
                      // optional: show a note if Zoho has a nearby errorMessage element
                    }
                  };

                  enforce9Digits('PhoneNumber_countrycode', 9);
                  enforce9Digits('PhoneNumber1_countrycode', 9);

                  // Required radio
                  const checkedRadio = getRadioChecked();
                  if (!checkedRadio) {
                    isValid = false;
                    const anyRadio = formEl.querySelector('input[type="radio"][name="Radio"]');
                    setInvalid(anyRadio ? anyRadio.closest('.zf-multiAttType') || anyRadio : anyRadio);
                  }

                  // If Other selected, require Radio_allow_others_text
                  if (checkedRadio && checkedRadio.value === 'zfs-others-zfs') {
                    const otherEl = getByName('Radio_allow_others_text');
                    const otherVal = otherEl ? String(otherEl.value || '').trim() : '';
                    if (!otherVal) {
                      isValid = false;
                      setInvalid(otherEl);
                    }
                  }

                  // If invalid, show Zoho-like red error messages (best-effort)
                  if (!isValid) {
                    return false;
                  }

                  // Valid: run Zoho validation/submit
                  // IMPORTANT: do NOT call formEl.submit() afterwards, otherwise Zoho can double-submit
                  // and cause an unwanted redirect/download behavior.
                  // eslint-disable-next-line no-undef
                  if (typeof window.zf_ValidateAndSubmit === 'function') {
                    // Zoho will handle its own submit/redirect.
                    // Allow the handler to complete so the expected redirect/flow occurs.
                    // eslint-disable-next-line no-undef
                    const ok = window.zf_ValidateAndSubmit();
                    return ok !== false;
                  }

                  // Fallback if Zoho submit function is not present
                  formEl.submit();
                  return true;
                }}
                acceptCharset="UTF-8"
                encType="multipart/form-data"
                id="form"
              >
                <input type="hidden" name="zf_referrer_name" value="" />
                <input type="hidden" name="zf_redirect_url" value="" />
                <input type="hidden" name="zc_gad" value="" />
                <input type="hidden" name="utm_source" value="" />
                <input type="hidden" name="utm_medium" value="" />
                <input type="hidden" name="utm_campaign" value="" />
                <input type="hidden" name="utm_term" value="" />
                <input type="hidden" name="utm_content" value="" />
                <input type="hidden" name="gclid" value="" />
                <div className="zf-templateWrapper">
                  <ul className="zf-tempHeadBdr">
                    <li className="zf-tempHeadContBdr">
                      <h2 className="zf-frmTitle">
                        <em>Voltronix Automation</em>
                      </h2>
                      <p className="zf-frmDesc"></p>
                      <div className="zf-clearBoth"></div>
                    </li>
                  </ul>

                  <div className="zf-subContWrap zf-topAlign">
                    <ul>
                      <div className="zf-tempFrmWrapper zf-name  zf-namelarge">
                        <label className="zf-labelName"></label>
                        <div className="zf-tempContDiv zf-twoType">
                          <div className="zf-nameWrapper">
                            <span>
                              <input type="text" maxlength="255" name="Name_First" fieldType={7} placeholder="First Name" />
                            </span>
                            <span>
                              <input type="text" maxlength="255" name="Name_Last" fieldType={7} placeholder="Last Name" />
                            </span>
                            <div className="zf-clearBoth"></div>
                          </div>
                          <p id="Name_error" className="zf-errorMessage" style={{ display: 'none' }}>Invalid value</p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>

                      <div className="zf-tempFrmWrapper  zf-large ">
                        <label className="zf-labelName"></label>
                        <div className="zf-tempContDiv">
                            <span>
                              <input type="text" name="Email" checktype="c5" maxlength="255" fieldType={9} placeholder="Email ID" />
                            </span>
                          <p id="Email_error" className="zf-errorMessage" style={{ display: 'none' }}>Invalid value</p>
                          <div className="zf-clearBoth"></div>
                        </div>
                      </div>

                      <div className="zf-tempFrmWrapper  zf-large ">
                        <label className="zf-labelName"></label>
                        <div className="zf-tempContDiv">
                            <span>
                              <input type="text" name="SingleLine" checktype="c1" maxlength="255" fieldType={1} placeholder="Company Name" />
                            </span>
                          <p id="SingleLine_error" className="zf-errorMessage" style={{ display: 'none' }}>Invalid value</p>
                          <div className="zf-clearBoth"></div>
                        </div>
                      </div>

                      <div className="zf-tempFrmWrapper zf- zf-large ">
                        <label className="zf-labelName"></label>
                        <div className="zf-tempContDiv zf-phonefld">
                          <div className="zf-phwrapper">
                            <span>
                              <input
                                type="text"
                                compname="PhoneNumber_countrycodeval"
                                name="PhoneNumber_countrycodeval"
                                checktype="c7"
                                maxlength="10"
                                phoneFormat="1"
                                isCountryCodeEnabled={true}
                                id="international_PhoneNumber_countrycodeval"
                                valType="code"
                                placeholder="+971"
                                defaultValue="+971"
                                readOnly
                                inputMode="numeric"
                                onKeyDown={(e) => e.preventDefault()}
                                onPaste={(e) => e.preventDefault()}
                              />
                                                         </span>
                            <span>
                              <input
                                type="text"
                                compname="PhoneNumber"
                                name="PhoneNumber_countrycode"
                                maxlength="9"
                                checktype="c7"
                                phoneFormat="1"
                                isCountryCodeEnabled={true}
                                fieldType={11}
                                id="international_PhoneNumber_countrycode"
                                valType="number"
                                phoneFormatType="2"
                                placeholder="Phone Number"
                                inputMode="numeric"
                                onPaste={(e) => {
                                  e.preventDefault();
                                  const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
                                  document.execCommand('insertText', false, text);
                                }}
                                onInput={(e) => {
                                  const el = e.target;
                                  if (!el) return;

                                  const digitsOnly = el.value.replace(/\D/g, '');
                                  if (el.value !== digitsOnly) el.value = digitsOnly;

                                  // Mark red when less than 9 digits (but non-empty)
                                  if (digitsOnly && digitsOnly.length < 9) el.classList.add('vx-client-error');
                                  else el.classList.remove('vx-client-error');
                                }}
                              />
                              
                              
                            </span>
                            <div className="zf-clearBoth"></div>
                          </div>
                          <p id="PhoneNumber_error" className="zf-errorMessage" style={{ display: 'none' }}>Invalid value</p>
                          <div className="zf-clearBoth"></div>
                        </div>
                      </div>

                      <div className="zf-tempFrmWrapper zf- zf-large ">
                        <label className="zf-labelName"></label>
                        <div className="zf-tempContDiv zf-phonefld">
                          <div className="zf-phwrapper">
                            <span>
                              <input
                                type="text"
                                compname="PhoneNumber1_countrycodeval"
                                name="PhoneNumber1_countrycodeval"
                                checktype="c7"
                                maxlength="10"
                                phoneFormat="1"
                                isCountryCodeEnabled={true}
                                id="international_PhoneNumber1_countrycodeval"
                                valType="code"
                                placeholder="+971"
                                defaultValue="+971"
                                readOnly
                                inputMode="numeric"
                                onKeyDown={(e) => e.preventDefault()}
                                onPaste={(e) => e.preventDefault()}
                              />
                             
                            </span>
                            <span>
                              <input
                                type="text"
                                compname="PhoneNumber1"
                                name="PhoneNumber1_countrycode"
                                maxlength="9"
                                checktype="c7"
                                phoneFormat="1"
                                isCountryCodeEnabled={true}
                                fieldType={11}
                                id="international_PhoneNumber1_countrycode"
                                valType="number"
                                phoneFormatType="2"
                                placeholder="Mobile Number"
                                inputMode="numeric"
                                onPaste={(e) => {
                                  e.preventDefault();
                                  const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
                                  document.execCommand('insertText', false, text);
                                }}
                                onInput={(e) => {
                                  const el = e.target;
                                  if (!el) return;

                                  const digitsOnly = el.value.replace(/\D/g, '');
                                  if (el.value !== digitsOnly) el.value = digitsOnly;

                                  // Mark red when less than 9 digits (but non-empty)
                                  if (digitsOnly && digitsOnly.length < 9) el.classList.add('vx-client-error');
                                  else el.classList.remove('vx-client-error');
                                }}
                              />
                                                          </span>
                            <div className="zf-clearBoth"></div>
                          </div>
                          <p id="PhoneNumber1_error" className="zf-errorMessage" style={{ display: 'none' }}>Invalid value</p>
                          <div className="zf-clearBoth"></div>
                        </div>
                      </div>

                      <div className="zf-radio zf-tempFrmWrapper zf-oneColumns">
                        <label className="zf-labelName">
                          What Services Looking for? <em className="zf-important"></em>
                        </label>
                        <div className="zf-tempContDiv">
                          <div className="zf-overflow">
                            <span className="zf-multiAttType">
                              <input className="zf-radioBtnType" type="radio" id="Radio_1" name="Radio" checktype="c1" value="Installation" />
                              <label htmlFor="Radio_1" className="zf-radioChoice">Installation</label>
                            </span>
                            <span className="zf-multiAttType">
                              <input className="zf-radioBtnType" type="radio" id="Radio_2" name="Radio" checktype="c1" value="Replacements" />
                              <label htmlFor="Radio_2" className="zf-radioChoice">Replacements</label>
                            </span>
                            <span className="zf-multiAttType">
                              <input className="zf-radioBtnType" type="radio" id="Radio_3" name="Radio" checktype="c1" value="Upgrades" />
                              <label htmlFor="Radio_3" className="zf-radioChoice">Upgrades</label>
                            </span>
                            <span className="zf-multiAttType">
                              <input className="zf-radioBtnType" type="radio" id="Radio_4" name="Radio" checktype="c1" value="Repairs" />
                              <label htmlFor="Radio_4" className="zf-radioChoice">Repairs</label>
                            </span>
                            <span className="zf-multiAttType">
                              <input className="zf-radioBtnType" type="radio" id="Radio_5" name="Radio" checktype="c1" value="Solutions" />
                              <label htmlFor="Radio_5" className="zf-radioChoice">Solutions</label>
                            </span>
                            <span className="zf-multiAttType fullColWrap">
                              <input className="zf-radioBtnType" id="Radio_others" type="radio" value="zfs-others-zfs" name="Radio" />
                              <label htmlFor="Radio_others" className="zf-radioChoice">Other</label>
                              <input name="Radio_allow_others_text" type="text" maxlength="150" />
                            </span>
                            <div className="zf-clearBoth"></div>
                          </div>
                          <p id="Radio_error" className="zf-errorMessage" style={{ display: 'none' }}>Invalid value</p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>

                      <div className="zf-tempFrmWrapper  zf-large ">
                        <label className="zf-labelName"></label>
                        <div className="zf-tempContDiv">
                          <span>
                            <textarea name="MultiLine" checktype="c1" maxlength="65535" placeholder="Message"></textarea>
                          </span>
                          <p id="MultiLine_error" className="zf-errorMessage" style={{ display: 'none' }}>Invalid value</p>
                          <div className="zf-clearBoth"></div>
                        </div>
                      </div>
                    </ul>
                  </div>

                  <ul>
                    <li className="zf-fmFooter">
                      <button className="zf-submitColor">Submit</button>
                    </li>
                  </ul>
                </div>

                <script type="text/javascript">
                  {`var dateAndMonthRegexFormateArray = zf_SetDateAndMonthRegexBasedOnDateFormate('dd-MMM-yyyy');
var zf_DateRegex = new RegExp(dateAndMonthRegexFormateArray[0]);
var zf_MonthYearRegex = new RegExp(dateAndMonthRegexFormateArray[1]);
var zf_MandArray = [ "Name_First", "Name_Last", "Email", "SingleLine", "PhoneNumber1_countrycode", "PhoneNumber1_countrycodeVal", "Radio", "MultiLine"]; 
var zf_FieldArray = [ "Name_First", "Name_Last", "Email", "SingleLine", "PhoneNumber_countrycode", "PhoneNumber_countrycodeVal", "PhoneNumber1_countrycode", "PhoneNumber1_countrycodeVal", "Radio", "MultiLine"]; 
var isSalesIQIntegrationEnabled = false;
var salesIQFieldsArray = [];`}
                </script>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
