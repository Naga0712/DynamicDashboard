import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';
import DatePicker from '../form/input/DatePicker';
import ApiManager from '../../services/ApiManager';
import Select from '../form/Select';
import { CompanyProfileDto } from '../../services/ApiClient';
import PageBreadcrumbWrapper from '../common/PageBreabCrumbWrapper';
import { useParams ,useNavigate} from 'react-router-dom';
import { useToast } from "../../components/form/input/ToastProvider";


interface Company {
  id?: number;
  companyName: string;
  companyNumber: string;
  incorporationDate: string;
  industry: number;
  countryOfOperation: number;
  headquarter: string;
  fullName: string;
  email: string;
  contactNumber: string;
}


const AddOrUpdateCompany = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, errors,isDirty },
  } = useForm<Company>({
    mode: 'onChange',
    defaultValues: {
      id: undefined,
      companyName: '',
      companyNumber: '',
      incorporationDate: '',
      industry: 0,
      countryOfOperation: 0,
      headquarter: '',
      fullName: '',
      email: '',
      contactNumber: '',
    },
  });


  const apiClient = new ApiManager().CreateApiClient();
  const [emailRegex, setEmailRegex] = useState<string>('');
  const [industryOptions, setIndustryOptions] = useState<{ value: number, label: string }[]>([]);
  const [geographyOptions, setGeoOptions] = useState<{ value: number, label: string }[]>([]);
    const { id } = useParams(); // this will be a string
const showToast = useToast();
const navigate = useNavigate();

  useEffect(() => {
    const selectedCompany: Company | null = null;
    if (selectedCompany) {
      reset(selectedCompany);
    }
  }, [reset]);

  useEffect(() => {
    appconfig();
    getindustry();
    getgeograpy();
  }, []);

  const appconfig = async (): Promise<void> => {
    const appconfigOption = await apiClient.getAppConfig();
    setEmailRegex(appconfigOption?.result?.find((e: any) => e.name === 'Email Regex')?.value || '');
  };
  const getindustry = async (): Promise<void> => {
    const datindustry: any = (await apiClient.getIndustry()).result;
    const formattedOptions = datindustry.map((item: any) => ({
      value: item.id,
      label: item.name
    }));

    setIndustryOptions(formattedOptions);
  }

  const getgeograpy = async (): Promise<void> => {
    const datindustry: any = (await apiClient.getGeograpy()).result;
    const formattedOptions = datindustry.map((item: any) => ({
      value: item.id,
      label: item.name
    }));

    setGeoOptions(formattedOptions);
  }

  useEffect(() => {
  const fetchCompany = async () => {
    if (id) {
      try {
        const companyData = await apiClient.getCompanyProfileById(Number(id));
        if (companyData && !companyData.hasError && companyData.result) {
          const company = Array.isArray(companyData.result) ? companyData.result[0] : companyData.result;
          if (company) {
            reset({
              id: company.id,
              companyName: company.companyName,
              companyNumber: company.companyIdentificationNumber,
              incorporationDate: company.dateofInCorporation,
              industry: company.industry,
              countryOfOperation: company.contryofOperation,
              headquarter: company.headQuartersLoacation,
              fullName: company.fullname,
              email: company.email,
              contactNumber: company.contactnumber,
            });
          }
        }
      } catch (error) {
        console.error("Error loading company profile:", error);
      }
    }
  };

  fetchCompany();
}, [id, reset]);

const onSubmit = async (data: Company) => {
  try {
    if (id) {
      // EDIT mode - only require fields that are being changed
      const response = await apiClient.updateCompanyprofile(
        data.id, // orgId (you may need to adjust this based on your data model)
        data.companyName,
        data.companyNumber,
        data.incorporationDate,
        data.industry,
        data.countryOfOperation,
        data.headquarter,
        data.fullName,
        data.email,
        data.contactNumber,
        1,
        "ESG Admin",
        true,
        Number(id)
      );

      if (response && !response.hasError) {
       showToast.success(`${t('UPDATE_COMPANY_PROFILE')}`);
       navigate('/home/companyprofile')
      } else {
        showToast.error(`${t('ERROR_OCCURED_UPDATE')}`)
      }
    } else {
      // ADD mode - require all fields
      const body = new CompanyProfileDto({
        companyName: data.companyName,
        companyIdentificationNumber: data.companyNumber,
        dateofInCorporation: data.incorporationDate,
        industry: data.industry,
        contryofOperation: data.countryOfOperation,
        headQuartersLoacation: data.headquarter,
        fullname: data.fullName,
        email: data.email,
        contactnumber: data.contactNumber,
        roleid: 1,
        roleName: "ESG Admin",
      });

      await apiClient.addCompanyProfile(body);
      showToast.success(`${t('ADD_COMAPNY_PROFILE')}`);
      navigate('/home/companyprofile')
      reset(); // Clear form after submit only for add mode
    }
  } catch (error) {
    showToast.error(`${t('ERROR_OCCURED_ADD')}`)
  }
};



  return (
    <><div className="flex justify-start mt-2">

      <PageBreadcrumbWrapper pageTitle={t('COMPANY_PROFILES')} pageLink={"/home/companyprofile"} />
    </div>
    <div>
        <div className="mx-auto  bg-white p-6 rounded-lg shadow-md">


          <h1 className="text-lg font-semibold text-gray-700"> {t('COL_BASIC_COMPANT_DETAILS')}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('COL_COMPANY_NAME')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Controller
                name="companyName"
                control={control}
                rules={{ required: 'Company name is required' }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Company Name"
                    {...field}
                    error={!!errors.companyName}
                    hint={errors.companyName?.message?.toString()} />
                )} />
            </div>


            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('COL_COMPANY_NUMBER')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Controller
                name="companyNumber"
                control={control}
                rules={{
                  required: 'CIN is required',
                  pattern: {
                    value: /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/,
                    message: 'Invalid CIN format',
                  },
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder={t('COMPANY_CIN').toString()}
                    {...field}
                    error={!!errors.companyNumber}
                    readOnly={Boolean(id)}
                    hint={errors.companyNumber?.message?.toString()} />
                )}
                />

            </div>


            <div>  <div className="flex items-center gap-1">
              <h2 className="text-lg text-gray-700">{t('COL_INCORPORATION_DATE')}</h2>
              <span className="text-red-500 text-sm">*</span>
            </div>

              <Controller
                name="incorporationDate"
                control={control}
                rules={{ required: t('START_DATE_REQUIRED').toString() }}
                render={({ field }) => (
                  <DatePicker className='react-datepicker-wrapper'
                    // wrapperClassName="w-full/"
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) => {
                      field.onChange(date ? date.toISOString() : '');
                    }}
                    placeholder={t('SELECT_START_DATE').toString()}
                    minDate={new Date('2000-01-01')} />
                )}/>
              {errors.incorporationDate && (
                <p className="text-red-500 text-sm">{errors.incorporationDate.message?.toString()}</p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('COL_COMPCOL_INDUSTRYANY_NUMBER')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Controller
                name="industry"
                control={control}
                rules={{ required: 'Industry is required' }}
                render={({ field }) => (
                  // <Input
                  //   type="text"
                  //   placeholder="Industry"
                  //   {...field}
                  //   error={!!errors.industry}
                  //   hint={errors.industry?.message?.toString()}
                  // />
                  <Select
                    options={industryOptions}
                    onChange={(newValue: any) => {
                      field.onChange(newValue);
                    }}
                    defaultValue={field.value}
                    error={Boolean(errors.industry?.message)}
                    hint={typeof errors.industry?.message === 'string' ? errors.industry?.message : JSON.stringify(errors.industry?.message)} />
                )}/>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('COL_COUNTRY')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>

              <div>
                <Controller
                  name="countryOfOperation"
                  control={control}
                  rules={{ required: 'Country is required' }}
                  render={({ field }) => (
                    // <Select
                    //   options={geographyOptions}
                    //   onChange={(value: number) => field.onChange(value)}
                    //   defaultValue={field.value}
                    //   error={!!errors.countryOfOperation}
                    //   hint={errors.countryOfOperation?.message?.toString()}
                    // />
                    <Select
                      options={geographyOptions}
                      onChange={(newValue: any) => {
                        field.onChange(newValue);
                      } }
                      defaultValue={field.value}
                      error={Boolean(errors.countryOfOperation?.message)}
                      hint={typeof errors.countryOfOperation?.message === 'string' ? errors.countryOfOperation?.message : JSON.stringify(errors.countryOfOperation?.message)} />
                  )} />
              </div>

            </div>

            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('COL_HEADQUARTER')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Controller
                name="headquarter"
                control={control}
                rules={{ required: 'Headquarter is required' }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder={t('COMPANY_HEADQUARTER').toString()}
                    {...field}
                    error={!!errors.headquarter}
                    hint={errors.headquarter?.message?.toString()} />
                )} />
            </div>
          </div>
        </div>

        <br />

        <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-lg font-semibold text-gray-700"> {t('COL_ESG_ADMIN_INFORMATION')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('COL_FULL_NAME')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: 'Full name is required' }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder={t('ADMIN_FULL_NAME').toString()}
                    {...field}
                    error={!!errors.fullName}
                    hint={errors.fullName?.message?.toString()}
                    readOnly={Boolean(id)} />
                )} />
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('USERS_EMAIL')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: new RegExp(emailRegex.slice(1, -1)),
                    message: 'Enter a valid email address',
                  },
                }}
                render={({ field }) => (
                  <Input
                    placeholder={t('ADMIN_EMAIL').toString()}
                    type="email"
                    {...field}
                    error={!!errors.email}
                    hint={errors.email?.message?.toString()}
                    readOnly={Boolean(id)} />
                )} />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-1">
                <h2 className="text-lg text-gray-700">{t('COL_CONTACT_NUMBER')}</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Controller
                name="contactNumber"
                control={control}
                rules={{
                  required: 'Contact number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Contact number must be exactly 10 digits',
                  },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder={t('ADMIN_CONTACT').toString()}
                    {...field}
                    error={!!errors.contactNumber}
                    hint={errors.contactNumber?.message?.toString()} />
                )} />
            </div>

          </div>

          <div>
            <Button
              onClick={handleSubmit(onSubmit)}
              // disabled={!isValid}
              disabled={!isDirty}

              className={`w-full px-4 py-2 text-white  rounded-md ${isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {id ? t('EDIT_COMPANY') : t('ADD_COMPANY')}
            </Button>

          </div>
        </div>
      </div></>
  );
};

export default AddOrUpdateCompany;
