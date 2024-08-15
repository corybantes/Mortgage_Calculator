"use client";

import React, { useState, useRef, useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MeterGroup } from "primereact/metergroup";
import { Toast } from "primereact/toast";

export default function Home() {
  const formatter = new Intl.NumberFormat("en-US", {});
  const [purchasePrice, setPurchasePrice] = useState<number>(302000);
  const [downPayment, setDownPayment] = useState(2.5);
  const [Mortgage, setMortgageType] = useState("30-years fixed");
  const mortgageType = [
    { name: "30-years fixed", code: 30 },
    { name: "15-years fixed", code: 15 },
  ];
  let Mort: number;
  if (Mortgage === "15-years fixed") {
    Mort = 15;
  } else if (Mortgage === "30-years fixed") {
    Mort = 30;
  } else {
    Mort = 0;
  }
  const [interestRate, setInterestRate] = useState<number>(6);
  const [annualTaxes, setAnnualTaxes] = useState<number>(1);
  const [insurance, setInsurance] = useState<number>(1800);
  const [HOA, setHOAvalue] = useState<number>(0);
  const downPaymentPrice = (downPayment * purchasePrice) / 100;
  const taxRate = (purchasePrice * annualTaxes) / 100;
  const principalInterest = Math.floor(
    ((purchasePrice - downPaymentPrice) * (interestRate / 100)) / 12
  );
  const propertyTaxes = Math.floor(taxRate / 12);
  const homeInsurance = Math.floor(insurance / 12 + HOA);
  const principalInterestPercent =
    (principalInterest / (principalInterest + propertyTaxes + homeInsurance)) *
    100;
  const propertyTaxesPercent =
    (propertyTaxes / (principalInterest + propertyTaxes + homeInsurance)) * 100;
  const homeInsurancePercent =
    (homeInsurance / (principalInterest + propertyTaxes + homeInsurance)) * 100;
  const monthlyPayment = Math.floor(
    principalInterest + propertyTaxes + homeInsurance
  );

  const values = [
    {
      label: "Principal & Interest",
      color: "#2f7dec",
      price: principalInterest,
      value: principalInterestPercent.toFixed(1),
    },
    {
      label: "Property Taxes",
      color: "#f5c74d",
      price: propertyTaxes,
      value: propertyTaxesPercent.toFixed(1),
    },
    {
      label: "Homeowners Insurance",
      color: "#9748ef",
      price: homeInsurance,
      value: homeInsurancePercent.toFixed(1),
    },
  ];
  const labelList = ({ values }) => (
    <div className='flex flex-col'>
      {values.map((item: any, index: any) => (
        <div className='flex-1 ' key={index}>
          <div className='flex flex-col'>
            <div className='flex py-2'>
              <span
                className='w-2 h-2 my-auto mr-2 rounded-full '
                style={{ backgroundColor: item.color, color: item.color }}
              ></span>
              <div className='w-full inline-flex justify-between'>
                <span className='text-secondary text-[15px]'>{item.label}</span>
                <span className='font-bold text-black'>
                  ${formatter.format(item.price)}
                </span>
                <span className='font-bold text-black text-opacity-35'>
                  {item.value}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Data Saved",
      life: 3000,
    });
    setDownPayment(0);
    setPurchasePrice(0);
    setAnnualTaxes(0);
    setInterestRate(0);
    setInsurance(0);
    setHOAvalue(0);
  };

  return (
    <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
      <main className='w-[1200px] h-[1200px]'>
        <div className='w-[600px] text-center m-auto p-[40px]'>
          <div className='text-[#3C4CE7] text-[10px] font-bold'>
            MORTGAGE CALCULATOR
          </div>
          <div className='font-bold text-[29px] my-3'>
            How much house can I afford?
          </div>
          <div className='text-[12px] text-opacity-35 text-black '>
            Enter the price of the home, your down payment, and a few details
            about your new home and loan terms to estimate your monthly payment
            breakdown.
          </div>
        </div>
        <div className='w-[930px] h-[800px] bg-white border-[1px] m-auto gap-11 flex justify-center p-16'>
          <div className='w-[380px] space-y-4'>
            <div className='card flex-auto'>
              <label
                htmlFor='purchase-price'
                className='text-[12px] block mb-1 text-opacity-55 text-black'
              >
                New Home Purchase Price
              </label>
              <div className='p-inputgroup w-full h-[40px] font-bold'>
                <span className='p-inputgroup-addon bg-white'>$</span>
                <InputNumber
                  inputId='purchase-price'
                  value={purchasePrice}
                  onValueChange={(e: InputNumberValueChangeEvent) =>
                    setPurchasePrice(e.value)
                  }
                  //prefix='$'
                  className=' '
                />
              </div>
              <div className='text-[12px] block my-2 text-opacity-35 text-black'>
                Enter the purchase price of the home you want to buy. You can
                also enter the amount that you think you will offer.
              </div>
            </div>

            <div className='card flex-auto '>
              <label
                htmlFor='down-payment'
                className='text-[12px] block mb-1 text-opacity-55 text-black'
              >
                Down Payment
              </label>
              <div className='p-inputgroup w-full h-[40px] border-none'>
                <InputNumber
                  inputId='down-payment'
                  value={downPayment}
                  onValueChange={(e: InputNumberValueChangeEvent) =>
                    setDownPayment(e.value)
                  }
                  suffix=' %'
                  className=''
                />
                <span className='p-inputgroup-addon bg-white border-l-0'>
                  $
                </span>
                <span className='p-inputgroup-addon bg-white border-l-0'>
                  {formatter.format(downPaymentPrice)}
                </span>
              </div>
            </div>
            <div className='card flex-auto justify-content-center'>
              <label
                htmlFor='mortgage-type'
                className='text-[12px] block mb-1 text-opacity-55 text-black'
              >
                Mortgage Type
              </label>
              <Dropdown
                value={Mortgage}
                onChange={(e) => setMortgageType(e.value)}
                options={mortgageType}
                optionLabel='name'
                editable
                placeholder='Select the mortgage type'
                className='w-full h-[40px]'
              />
            </div>
            <div className='card flex-auto'>
              <label
                htmlFor='interest-rate'
                className='text-[12px] block mb-1 text-opacity-55 text-black'
              >
                Interest Rate
              </label>
              <InputNumber
                inputId='interest-rate'
                value={interestRate}
                onValueChange={(e: InputNumberValueChangeEvent) =>
                  setInterestRate(e.value)
                }
                suffix=' %'
                className='w-full h-[40px]'
              />
            </div>
            <div className='card flex-auto'>
              <label
                htmlFor='taxes'
                className='text-[12px] block mb-1 text-opacity-55 text-black'
              >
                Annual Property Taxes
              </label>
              <div className='p-inputgroup w-full h-[40px]'>
                <InputNumber
                  inputId='taxes'
                  value={annualTaxes}
                  onValueChange={(e: InputNumberValueChangeEvent) =>
                    setAnnualTaxes(e.value)
                  }
                  suffix=' %'
                  className='w-full h-[40px]'
                />
                <span className='p-inputgroup-addon bg-white border-l-0 '>
                  $
                </span>
                <span className='p-inputgroup-addon bg-white border-l-0 inline-flex'>
                  {formatter.format(taxRate)}
                </span>
                <span className='p-inputgroup-addon bg-white border-l-0 text-opacity-35 text-black'>
                  /yr
                </span>
              </div>
              <div className='text-[12px] block my-2 text-opacity-35 text-black'>
                Average US annual property tax rate is 1%
              </div>
            </div>
            <div className='card flex-auto'>
              <label
                htmlFor='insurance'
                className='text-[12px] block mb-1 text-opacity-55 text-black'
              >
                Annual Homeowners Insurance
              </label>
              <div className='p-inputgroup w-full h-[40px] font-bold'>
                <span className='p-inputgroup-addon bg-white'>$</span>
                <InputNumber
                  inputId='insurance'
                  value={insurance}
                  onValueChange={(e: InputNumberValueChangeEvent) =>
                    setInsurance(e.value)
                  }
                  //prefix='$'
                  suffix=' /yr'
                  className='w-full h-[40px] font-bold'
                />
              </div>
            </div>
            <div className='card flex-auto'>
              <label
                htmlFor='monthly-fees'
                className='text-[12px] block mb-1 text-opacity-55 text-black'
              >
                Monthly HOA Fees
              </label>
              <div className='p-inputgroup w-full h-[40px]'>
                <span className='p-inputgroup-addon bg-white'>$</span>
                <InputNumber
                  inputId='monthly-fees'
                  value={HOA}
                  onValueChange={(e: InputNumberValueChangeEvent) =>
                    setHOAvalue(e.value)
                  }
                  //prefix='$'
                  suffix=' /mo'
                  className='w-full h-[40px]'
                />
              </div>
              <div className='text-[12px] block my-2 text-opacity-35 text-black'>
                Only applies if your home is part of a homeowner`&apos;`s
                association
              </div>
            </div>
          </div>
          <div className=' '>
            <div className='w-[400px] h-[320px] bg-[#2b79de] rounded-2xl'>
              <div className='grid w-[400px] h-[315px] shadow-xl bg-white m-auto rounded-2xl p-8'>
                <div className='w-full m-auto flex-col text-center'>
                  <div className='text-[15px] text-opacity-55 text-black'>
                    Estimated Monthly Payment
                  </div>
                  <div className='text-[45px] text-[#3a4ac3] font-extrabold'>
                    ${formatter.format(monthlyPayment)}
                  </div>
                </div>
                <div className='w-full card flex justify-content-center m-auto '>
                  <MeterGroup
                    values={values}
                    labelPosition='end'
                    labelOrientation='vertical'
                    labelList={labelList}
                    className='w-full'
                    min={0}
                  />
                </div>
              </div>
            </div>
            <div className='w-full h-[45px] bg-[#3657d8] card flex justify-center my-4 rounded'>
              <Toast ref={toast} />

              <Button
                label='Save'
                icon='fa-regular fa-floppy-disk'
                onClick={showSuccess}
                className='bg-[#3657d8] border-none'
              />
            </div>
          </div>
        </div>
      </main>
    </PrimeReactProvider>
  );
}
