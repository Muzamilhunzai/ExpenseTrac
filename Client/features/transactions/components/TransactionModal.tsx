'use client';

import React, { useState, useCallback } from 'react';
import { Database } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useTransactions } from '@/hooks/useTransactions';
import { TRANSACTION_CATEGORIES, PAYMENT_METHODS } from '@/constants';
import type { CreateTransactionPayload, TransactionType } from '@/types/transaction';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryOptions = TRANSACTION_CATEGORIES.map((c) => ({ value: c, label: c }));
const paymentOptions = PAYMENT_METHODS.map((m) => ({ value: m, label: m }));
const typeOptions = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
];

const EMPTY_FORM: CreateTransactionPayload = {
  title: '',
  description: '',
  category: 'Other',
  amount: 0,
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
  paymentMethod: 'Direct Debit',
};

export function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
  const [form, setForm] = useState<CreateTransactionPayload>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTransactionPayload, string>>>({});
  const { create, isSubmitting } = useTransactions();

  const validate = useCallback((): boolean => {
    const newErrors: typeof errors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.amount || form.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    try {
      await create(form);
      setForm(EMPTY_FORM);
      onClose();
    } catch {
      // error handled in hook
    }
  }, [form, create, onClose, validate]);

  const handleChange = useCallback(
    (field: keyof CreateTransactionPayload, value: string | number) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleClose = useCallback(() => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Log New Transaction"
      size="md"
    >
      <div className="flex items-center gap-2 mb-6">
        <Database size={20} className="text-primary" />
        <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">
          Inject financial data-stream
        </span>
      </div>

      <div className="space-y-5">
        <Input
          label="Source Title"
          placeholder="e.g. Orbital Data Stream Sub"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
        />

        <Input
          label="Description (optional)"
          placeholder="Additional context..."
          value={form.description ?? ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
          <Select
            label="Type"
            options={typeOptions}
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value as TransactionType)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Amount ($)"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount || ''}
            onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
            error={errors.amount}
          />
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={errors.date}
          />
        </div>

        <Select
          label="Payment Method"
          options={paymentOptions}
          value={form.paymentMethod ?? ''}
          onChange={(e) => handleChange('paymentMethod', e.target.value)}
        />
      </div>

      <div className="flex gap-4 mt-8 pt-6 border-t border-outline-variant/30">
        <Button variant="outline" onClick={handleClose} className="flex-1" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          className="flex-1"
        >
          Inject Data
        </Button>
      </div>
    </Modal>
  );
}
