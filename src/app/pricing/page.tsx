import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free Explorer',
    price: '$0',
    period: '/month',
    features: ['Access to limited videos', 'Standard quality streaming', 'Ad-supported'],
    cta: 'Start for Free',
  },
  {
    name: 'Cosmic Voyager',
    price: '$9.99',
    period: '/month',
    features: ['Unlimited video access', 'HD & 4K streaming', 'Ad-free experience', 'Offline downloads'],
    cta: 'Choose Plan',
    popular: true,
  },
  {
    name: 'Galactic Pro',
    price: '$19.99',
    period: '/month',
    features: ['All Cosmic Voyager features', 'Early access to new content', 'Priority support', 'Exclusive content'],
    cta: 'Choose Plan',
  },
];

export default function PricingPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground">Start your journey through the cosmos with a plan that fits you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-primary/20' : ''}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-4xl font-headline font-bold">
                {plan.price}
                <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>{plan.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}