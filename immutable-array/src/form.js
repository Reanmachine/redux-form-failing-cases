import React from "react";

import { 
    reduxForm,
    Field,
    FieldArray
} from "redux-form/immutable";

// Pulling these actions out here so they can have breakpoints
// put inside them.

const addField = (fields) => {
    fields.push();
};

const removeField = (fields, index) => { 
    fields.remove(index);
};

const FormField = ({ input, label, type, meta: { touched, error }}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const FormArrays = props => {
    const { fields } = props;

    return (
        <ul>
            <li>Things:</li>
            {fields.map((item, index) => 
                <li key={index}>
                    <button
                        type="button"
                        onClick={() => removeField(fields, index)}>
                        Remove
                    </button>
                    <Field
                        name={item}
                        type="text"
                        component={FormField}
                        label={"Item #" + (index + 1)} />
                </li>
            )}
            <li>
                <button
                    type="button"
                    onClick={() => addField(fields)}>
                    Add New Thing
                </button>
            </li>
        </ul>
    );
};

const Form = props => {

    const {
        handleSubmit,
        pristine,
        submitting,
        error,
        reset
    } = props;

    return (
        
        <form onSubmit={handleSubmit}>
            <section data-purpose="explanation">
                <p>
                    There are two bugs at play here:
                </p>
                <ol>
                    <li>The `value` field has an empty `Map{}` in it. This should be blank?</li>
                    <li>The `fields.things` object is being accidentally converted to a `Map()` at some point.</li>
                </ol>
                <p>
                    To begin, #1 should be very obvious right off the bat. New fields added have `Map{}` in them.
                    To follow, #2 can be reproduced by the following steps:
                </p>
                <ol>
                    <li>Add an item, type 'test' at the end of the existing input.</li>
                    <li>Add another two items, type 'test' at the end of the 3rd input.</li>
                    <li>Try and add another item</li>
                </ol>
                <dl>
                    <dt>Expected</dt>
                    <dd>A fourth item is added.</dd>
                    <dt>Actual</dt>
                    <dd>
                        The following error is given in the console:
<pre>{`
Uncaught TypeError: list.splice is not a function
  exports.default       @	splice.js:17
  doSplice              @	reducer.js:37
  arraySplice           @	reducer.js:44
  (anonymous function)  @	reducer.js:90
  reducer               @	reducer.js:396
  (anonymous function)  @	reducer.js:412
`}</pre>
                        This is because the value it's trying to `splice` is now a Map() not a List() and no longer iterable.
                    </dd>
                </dl>
            </section>
            <section data-purpose="fields">
                <h3>Array Field Example</h3>
                <FieldArray name="things" component={FormArrays} />
            </section>
            <section data-purpose="actions">
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </section>
        </form>
    )
};

const validate = values => {
    let errors = {};

    return errors;
};

export default reduxForm({
    form: 'Example',
    validate
})(Form);