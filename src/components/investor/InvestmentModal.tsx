import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  X,
  DollarSign,
  Calculator,
  CreditCard,
  Wallet,
  Building,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface Offering {
  id: string;
  companyName: string;
  logo: string;
  minInvestment: number;
  maxInvestment: number;
  targetRaise: number;
  raisedAmount: number;
  investmentStructure: string;
}

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  offering: Offering;
  onInvest: (amount: number, paymentMethod: string) => void;
}

type PaymentMethod = 'bank_transfer' | 'digital_wallet' | 'credit_card';

const InvestmentModal: React.FC<InvestmentModalProps> = ({
  isOpen,
  onClose,
  offering,
  onInvest
}) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  const amount = Number(investmentAmount) || 0;
  const investmentUnits = Math.floor(amount / 10000);
  const shareCount = investmentUnits * 10;
  const transactionFee = amount * 0.025; // 2.5% transaction fee
  const totalAmount = amount + transactionFee;

  const isValidAmount = amount >= offering.minInvestment && amount <= offering.maxInvestment;
  const canProceed = isValidAmount && agreedToTerms && !processing;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setInvestmentAmount(value);
    }
  };

  const handleQuickAmount = (amount: number) => {
    setInvestmentAmount(amount.toString());
  };

  const handleProceed = async () => {
    if (!canProceed) return;

    setProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowConfirmation(true);
      
      // Call parent's onInvest after a delay
      setTimeout(() => {
        onInvest(amount, paymentMethod);
        setProcessing(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Investment failed:', error);
      setProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: 'bank_transfer' as PaymentMethod,
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct transfer from your bank account',
      processingTime: '1-2 business days'
    },
    {
      id: 'digital_wallet' as PaymentMethod,
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'eSewa, Khalti, or other digital wallets',
      processingTime: 'Instant'
    },
    {
      id: 'credit_card' as PaymentMethod,
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, or other cards',
      processingTime: 'Instant'
    }
  ];

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Investment Submitted!</h3>
            <p className="text-gray-600 mb-4">
              Your investment of NPR {amount.toLocaleString()} in {offering.companyName} has been submitted for processing.
            </p>
            <p className="text-sm text-gray-500">
              You will receive a confirmation email shortly with further instructions.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <img
                src={offering.logo}
                alt={`${offering.companyName} logo`}
                className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offering.companyName)}&size=40&background=f3f4f6&color=374151&format=svg`;
                }}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Invest in {offering.companyName}</h2>
                <p className="text-sm text-gray-600">Complete your investment</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Investment Amount */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="investment-amount" className="text-base font-medium">
                Investment Amount
              </Label>
              <div className="mt-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    NPR
                  </span>
                  <Input
                    id="investment-amount"
                    type="text"
                    value={investmentAmount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="pl-12 text-lg"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  {[offering.minInvestment, 50000, 100000, 250000].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(quickAmount)}
                      className="text-xs"
                    >
                      {quickAmount >= 100000 
                        ? `${quickAmount / 100000}L` 
                        : `${quickAmount / 1000}K`
                      }
                    </Button>
                  ))}
                </div>
                
                {/* Validation Messages */}
                {amount > 0 && (
                  <div className="mt-2">
                    {amount < offering.minInvestment && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Minimum investment is NPR {offering.minInvestment.toLocaleString()}
                      </p>
                    )}
                    {amount > offering.maxInvestment && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Maximum investment is NPR {offering.maxInvestment.toLocaleString()}
                      </p>
                    )}
                    {isValidAmount && (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Valid investment amount
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Investment Summary */}
            {amount > 0 && isValidAmount && (
              <Card className="bg-blue-50 border-blue-200">
                <div className="p-4">
                  <h3 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Investment Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Investment Amount</span>
                      <span className="font-medium">NPR {amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Investment Units</span>
                      <span className="font-medium">{investmentUnits} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Estimated Shares</span>
                      <span className="font-medium">{shareCount} shares</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Transaction Fee (2.5%)</span>
                      <span className="font-medium">NPR {transactionFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-blue-300 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-blue-900">Total Amount</span>
                        <span>NPR {totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Payment Method */}
            {isValidAmount && (
              <div>
                <Label className="text-base font-medium">Payment Method</Label>
                <div className="mt-3 space-y-3">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`cursor-pointer border-2 transition-colors ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            paymentMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <method.icon className={`h-5 w-5 ${
                              paymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{method.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Processing time: {method.processingTime}
                            </p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            paymentMethod === method.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {paymentMethod === method.id && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            {isValidAmount && (
              <div className="space-y-4">
                <Card className="bg-yellow-50 border-yellow-200">
                  <div className="p-4">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900 mb-1">Important Information</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• This is a pre-IPO investment with inherent risks</li>
                          <li>• Your investment is subject to lock-in periods</li>
                          <li>• Returns are not guaranteed and depend on company performance</li>
                          <li>• Please review all documents before investing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I have read and agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>,{' '}
                    <a href="#" className="text-blue-600 hover:underline">Risk Disclosure</a>, and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Investment Agreement</a>.
                    I understand the risks associated with pre-IPO investments.
                  </label>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleProceed}
                disabled={!canProceed}
                className="flex-1 relative"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Confirm Investment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvestmentModal;
