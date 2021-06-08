import { validationMixin } from 'vuelidate'
import { deepClone } from '@/utils'

export const mixForm = {
  mixins: [validationMixin],
  validations () {
    return this.validationSchema
  },
  props: {
    loading: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      validating: false
    }
  },
  computed: {
    validationRulesVars () {
      return this.$props
    },
    validationRules () {
      return !this.$options.validationRules ? {} : this.$options.validationRules(this.validationRulesVars)
    },
    validationSchema () {
      const fields = Object.entries(this.validationRules).reduce((schema, [field, rules]) => {
        schema[field] = Object.entries(rules).reduce((validators, [name, options]) => {
          validators[name] = options.validator
          return validators
        }, {})
        return schema
      }, {})
      return { fields }
    },
    validationErrors () {
      return Object.keys(this.validationRules).reduce((allErrors, fieldName) => {
        if (!allErrors[fieldName]) allErrors[fieldName] = []
        if (!this.$v.fields[fieldName].$dirty || this.$v.fields[fieldName].$pending) return allErrors
        Object.entries(this.validationRules[fieldName]).forEach(([validatorName, validatorConfig]) => {
          if (!this.$v.fields[fieldName][validatorName]) {
            allErrors[fieldName].push(validatorConfig.message)
          }
        })
        return allErrors
      }, {})
    }
  },
  methods: {
    populate (data) {
      this.fields = Object.keys(this.fields).reduce((acc, field) => {
        if (data && data[field] !== null) acc[field] = data[field]
        return acc
      }, {})
    },
    composeFormData (fields) {
      return deepClone(fields)
    },
    async beforeValidate () {
      return true
    },
    /**
     * Must return a promise always resolved with Boolean value
     */
    async validate () {
      return new Promise((resolve, reject) => {
        this.validating = true
        this.$v.$reset()
        this.$v.$touch()
        if (!this.$v.fields.$pending) {
          resolve(!this.$v.fields.$error)
        } else {
          const unwatch = this.$watch('$v.fields.$pending', function (pending) {
            if (pending) return
            resolve(!this.$v.fields.$error)
            unwatch()
          })
        }
      })
    },
    async submit () {
      try {
        return await this._doSubmit()
      } catch (e) {}
    },
    async _doSubmit () {
      // execute pre-validation logic and exit if pre-validation didn't passed
      const next = await this.beforeValidate()
      if (!next) return

      // validate the form and exit if validation didn't passed
      const isValid = await this.validate()
      if (!isValid) return

      // emit and return form data if validation passed successfully
      return this.emitData()
    },
    emitData () {
      const formData = this.composeFormData(this.fields)
      this.$emit('submit', formData)
      return formData
    }
  }
}