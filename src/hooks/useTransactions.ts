import { useState, useEffect } from 'react';
import { getTransactions, type Transaction } from '@/services/transactionService';
import { useAuth } from '@/contexts/AuthContext';

export const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.uid) {
      const fetchTransactions = async () => {
        try {
          setLoading(true);
          const userTransactions = await getTransactions(user.uid);
          setTransactions(userTransactions);
        } catch (err) {
          setError('Failed to fetch transactions.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    } else {
      setTransactions([]);
      setLoading(false);
    }
  }, [user]);

  return { transactions, loading, error };
};