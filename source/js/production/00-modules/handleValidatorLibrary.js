/* globals $ */
var handleValidatorLibrary = function() {
  $('.form-group').each(function() {
    var self = $(this);
    if (self.attr('data-toggle') === 'validator') {
      self.parent().attr('data-toggle', 'validator')
        .attr('data-delay', self.attr('data-delay')).validator();
    }
  });

  $('form[data-toggle="validator"]').each(function() {
    var $form = $(this);
    $form.on('validate.bs.validator', function() {
      var allValid = true;
      $form.find('input').each(function() {
        if (!this.validity.valid) {
          allValid = false;
        }
        if ($(this).attr('type') === 'file'
          && $(this).attr('required')
          && $(this).val() === ''
          && !$(this).val()) {
          allValid = false;
        }
      });

      if (allValid) {
        $form.find('.a-js-hideWhenInvalid').show();
        $form.find('.a-js-enableWhenValid').removeAttr('disabled');
        $form.find('.a-js-enableWhenValid').addClass('mt-3');
        $form.find('.a-js-enableWhenValid').addClass('hidden-xl-down');
      } else {
        $form.find('.a-js-hideWhenInvalid').hide();
        $form.find('.a-js-enableWhenValid').attr('disabled', true);
        $form.find('.a-js-enableWhenValid').removeClass('mt-3');
        $form.find('.a-js-hideWhenInvalid').addClass('hidden-xl-down');
      }
    });

    $(this).trigger('validate.bs.validator');
  });
};
