import { email, required, validators } from 'valtors';

const rules = {
  email: validators(required(), email()),
};

export default rules;
