import { useState, useCallback } from 'react';

export interface ValidationRules {
  required?: boolean;
  minAmount?: number;
  maxAmount?: number;
  isPan?: boolean;
  isEmail?: boolean;
  isMobile?: boolean;
  custom?: (val: any) => string | null;
}

export const useFormValidation = <T extends Record<string, any>>(initialValues: T, rules: Partial<Record<keyof T, ValidationRules>>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback((name: keyof T, val: any): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    if (rule.required && (val === undefined || val === null || val === '')) {
      return 'This field is required';
    }

    if (rule.minAmount !== undefined && parseFloat(val) < rule.minAmount) {
      return `Minimum amount is ₹${rule.minAmount.toLocaleString('en-IN')}`;
    }

    if (rule.maxAmount !== undefined && parseFloat(val) > rule.maxAmount) {
      return `Maximum amount is ₹${rule.maxAmount.toLocaleString('en-IN')}`;
    }

    if (rule.isPan) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (val && !panRegex.test(val.toUpperCase())) {
        return 'Invalid PAN format (e.g. ABCDE1234F)';
      }
    }

    if (rule.isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val && !emailRegex.test(val)) {
        return 'Invalid email address';
      }
    }

    if (rule.isMobile) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (val && !mobileRegex.test(val)) {
        return 'Enter valid 10-digit Indian mobile number';
      }
    }

    if (rule.custom) {
      return rule.custom(val);
    }

    return null;
  }, [rules]);

  const handleChange = (name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key in rules) {
      const errorMsg = validateField(key, values[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues
  };
};
