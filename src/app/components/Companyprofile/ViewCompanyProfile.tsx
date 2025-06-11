import ApiManager from "../../services/ApiManager";
import { t } from "i18next";
import { useEffect, useState } from "react";
import TableWrapper from "../../components/form/input/TableWrapper";
import Button from "../ui/button/Button";
import PageBreadcrumbWrapper from "../common/PageBreabCrumbWrapper";
import { useModal } from "../../hooks/useModal"
import { IsactiveactionType } from "../common/Enum";
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';
import { Check, X } from "lucide-react";
import { Modal } from "../ui/modal";
const ViewCompanyProfile: React.FC = () => {
  const apiClient = new ApiManager().CreateApiClient()
  const [companyProfile, setCompanyProfile] = useState<any[]>([]);
  const [industryList, setIndustryList] = useState<any[]>([]);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [actionType, setActionType] = useState<'activate' | 'deactivate' | null>(null);
  const { isOpen, openModal, closeModal: baseCloseModal } = useModal();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const navigate = useNavigate();

  const closeModal = () => {
    baseCloseModal();
    fetchCompanyProfile();
    setSelectedRowData(null);
  };

  useEffect(() => {
    fetchCompanyProfile();
    fetchIndustry();
    fetchCountry();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const res = await apiClient.getCompanyProfile();
      if (res && !res.hasError && res.result) {
        // Ensure each item has required fields
        const processedData = res.result.map((item: any, index: number) => ({
          ...item,
          index: index + 1,
          id: item.id || 0
        }));
        setCompanyProfile(processedData);
      }
    } catch (error) {
      console.error("Error fetching company profile:", error);
    }
  };

  const fetchIndustry = async () => {
    try {
      const res = await apiClient.getIndustry();
      if (res && !res.hasError && res.result) {
        setIndustryList(res.result);
      }
    } catch (error) {
      console.error("Error fetching industry list:", error);
    }
  };

  const fetchCountry = async () => {
    try {
      const res = await apiClient.getGeograpy();
      if (res && !res.hasError && res.result) {
        setCountryList(res.result);
      }
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  };

  const getIndustryName = (industryId: number) => {
    const match = industryList.find((item: any) => item.id === industryId);
    return match?.name || "";
  };

  const getCountryName = (countryId: number) => {
    const match = countryList.find((item: any) => item.id === countryId);
    return match?.name || "";
  };

  const openConfirmModal = (companyId: number, type: 'activate' | 'deactivate') => {
    setSelectedCompanyId(companyId);
    setActionType(type);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (selectedCompanyId && actionType) {
      try {
        if (actionType === IsactiveactionType.activate) {
           await apiClient.activeCompanyprofile(selectedCompanyId);
        } else if (actionType === IsactiveactionType.deactivate) {
           await apiClient.deactivateCompanyprofile(selectedCompanyId);
        }
        fetchCompanyProfile();
      } catch (error: any) {
        console.error(`Error ${actionType === IsactiveactionType.activate ? 'activating' : 'deactivating'} company:`, error);
      }
    }
    setIsConfirmModalOpen(false);
  };

  const handleRowClick = (row: any) => {
  navigate(`/home/companyprofile/edit/${row.id}`);
};

  const actionColumn = (row: any) => {
    if (row.index && row.id) {
      return (
        <div className="flex space-x-2">
          {row.isactive === false ? (
            <Check
              className="w-5 h-5 text-green-500 cursor-pointer"
              onClick={() => openConfirmModal(row.id!, 'activate')}
            />
          ) : (
            <X
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => openConfirmModal(row.id!, 'deactivate')}
            />
          )}
        </div>
      );
    }
    return null;
  };

  const columns: any = [
    {
      name: <div>{t("S_NO")}</div>,
      selector: (_row: any, index: number) => index,
    },
    {
      key: "companyName",
      name: <div>{t("COL_COMPANY_NAME")}</div>,
      selector: (row: any) => row.companyName,
      sortable: true,
    },
    {
      name: <div>{t("COL_COMPANY_NUMBER")}</div>,
      selector: (row: any) => (
        <span
          onClick={() => handleRowClick(row)}
          className={`cursor-pointer ${
            row.isactive ? "text-blue-500" : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {row.companyIdentificationNumber}
        </span>
      ),
    },
    {
      name: <div>{t("COL_INCORPORATION_DATE")}</div>,
      selector: (row: any) => {
        if (!row.dateofInCorporation) return "";
        const date = new Date(row.dateofInCorporation);
        return date.toLocaleDateString();
      },
    },
    {
      name: <div>{t("COL_COMPCOL_INDUSTRYANY_NUMBER")}</div>,
      selector: (row: any) => getIndustryName(row.industry),
    },
    {
      name: <div>{t("COL_HEADQUARTER")}</div>,
      selector: (row: any) => row.headQuartersLoacation,
    },
    {
      name: <div>{t("COL_COUNTRY")}</div>,
      selector: (row: any) => getCountryName(row.contryofOperation),
    },
    {
      name: <div>{t("ACTIVE")}</div>,
      selector: (row: any) => (row.isactive ? "Active" : "Inactive"),
    },
    {
      name: <div>{`${t("COL_ACTION")}`}</div>,
      selector: actionColumn.bind(this),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-start gap-1 mb-4">
        <PageBreadcrumbWrapper
          pageTitle={t("COL_BASIC_COMPANT_DETAILS")}
          pageLink={"/home/companyprofile"}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">{t("COL_BASIC_COMPANT_DETAILS")}</h2>
      </div>

      <div className="flex justify-end mb-4">
        <Link to={"/home/companyprofile/add"}>
          <Button className="h-10 px-4" >
            {t("COL_ADD_COMPANY")}
          </Button>
        </Link>
      </div>

      <TableWrapper column={columns} renderData={companyProfile} />

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} className="max-w-[380px] p-6 lg:p-10">
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {actionType === IsactiveactionType.activate ? 'Activate Company' : 'Deactivate Company'}
            </h5>
          </div>
          <p className="mb-4 text-gray-600">
            {actionType === IsactiveactionType.activate

              ? t('CONFIRM_ACTIVATE')
              : t('CONFIRM_DEACTIVATE')}
          </p>
          <div className="flex justify-end space-x-4">
            <Button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              {`${t('BTN_CANCEL')}`}
            </Button>
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleConfirmAction}
            >
              {`${t('BTN_CONFIRM')}`}
            </Button>
          </div>
        </div>
      </Modal>
    </div>

    
  );
};

export default ViewCompanyProfile;