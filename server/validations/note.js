
function validateInput(validField, data) {
    let errors = data.errors;
    let isValid = true;

    if (['allForm', 'note'].indexOf(validField) >= 0 &&
        data.note.length === 0)
    {
        errors.note = 'This field is required';
        isValid = false;
    }

    if (['allForm', 'note'].indexOf(validField) >= 0 &&
        data.note.length < 2)
    {
        errors.note = 'length 2 or more symbol';
        isValid = false;
    }

    if (['allForm', 'note'].indexOf(validField) >= 0 &&
        data.note.length > 49)
    {
        errors.note = 'length not more then 50 symbol';
        isValid = false;
    }

    if (['allForm', 'description'].indexOf(validField) >= 0 &&
        data.description.length === 0)
    {
        errors.description = 'This field is required';
        isValid = false;
    }

    if (['allForm', 'description'].indexOf(validField) >= 0 &&
        data.description.length < 2)
    {
        errors.description = 'length 2 or more symbol';
        isValid = false;
    }


    return {
        errors,
        isValid: isValid
    };
}
module.exports = validateInput;