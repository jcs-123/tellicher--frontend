import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'; // ✅ Import it
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';

import LiturgicalCalendar from './pages/LiturgicalCalendar';
import Circulars from './pages/Circulars';
import Home from './pages/Home';
import OurPatron from './pages/OurPatron';
import History from './pages/History';
import Statistics from './pages/Statistics';
import Landmark from './pages/Landmark';
import MarJosephPamplany from './pages/MarJosephPamplany';
import MarGeorgeNjaralakatt from './pages/MarGeorgeNjaralakatt';
import MarGeorgeValiamattam from './pages/MarGeorgeValiamattam';
import MarSebastianValloppilly from './pages/MarSebastianValloppilly';

import Curia from './pages/Curia';
import PastoralCouncil from './pages/PastoralCouncil';
import PresbyteralCouncil from './pages/PresbyteralCouncil';
import ArcheparchialTribunal from './pages/ArcheparchialTribunal';
import OtherCommittees from './pages/OtherCommittees';

import Foranes from './pages/Foranes';
import Parishes from './pages/Parishes';
import FilialChurches from './pages/FilialChurches';
import ArchdiocesanPriests from './pages/ArchdiocesanPriests';
import Obituary from './pages/Obituary';

import CatechismDepartment from './pages/CatechismDepartment';
import HolyChildhood from './pages/HolyChildhood';
import Cherupushpa from './pages/Cherupushpa';
import KCYM from './pages/Kcym';
import AllKeralaCatholicCongress from './pages/AllKeralaCatholicCongress';
import KCBCMadyaVirudhaSamidhi from './pages/Kcbcmandya';
import Mukthisree from './pages/Mukthisree';
import AntiDrugsStudentsUnion from './pages/AntiDrugsStudentsUnion';
import Infam from './pages/Infam';
import StVincentDePaul from './pages/StVincentDePaul';
import Sfo from './pages/Sfo';
import FamilyApostolate from './pages/FamilyApostolate';
import FamilyUnits from './pages/FamilyUnits';
import InternetMission from './pages/InternetMission';
import BibleApostolate from './pages/BibleApostolate';
import MediaApostolate from './pages/MediaApostolate';
import SanjoseAcademy from './pages/SanjoseAcademy';
import TSSS from './pages/Tsss';
import ADAM from './pages/ADAM';
import AlphaInstitute from './pages/AlphaInstitute';
import AIFEL from './pages/AIFEL';
import TRAC from './pages/TRAC';
import CatholicTeachersGuild from './pages/CatholicTeachersGuild';
import CharismaticMovement from './pages/CharismaticMovement';

import EducationalInstitution from './pages/EducationalInstitution';
import SocialCharitableInstitutions from './pages/SocialCharitableInstitutions';
import ReligiousHousesMen from './pages/ReligiousHousesMen';
import ReligiousHousesWomen from './pages/ReligiousHousesWomen';

import Downloads from './pages/Downloads';
import News from './pages/News';
import Bulletins from './pages/Bulletins';
import PhotoGallery from './pages/PhotoGallery';
import VideoGallery from './pages/VideoGallery';
import EventCalendar from './pages/EventCalendar';
import ArchdiocesanWebsites from './pages/ArchdiocesanWebsites';
import OtherEcclesiasticalWebsites from './pages/OtherEcclesiasticalWebsites';
import VianneyNidhi from './pages/VianneyNidhi';


// ✅ Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddYoutubeKeyvalue from './pages/admin/AddYoutubeKeyvalue';
import AddHomeVideo from './pages/admin/AddHomeVideo';
import UploadProgrammeDiary from './pages/admin/UploadProgrammeDiary';
import WebsiteLinks from './pages/admin/WebsiteLinks';
import AddNews from './pages/admin/AddNews';
import NewsDetail from './pages/NewsDetail';
import AdminNewsList from './pages/admin/AdminNewsList';
import AddBulletin from './pages/admin/AddBulletin';
import BulletinList from './pages/admin/BulletinList';
import AddDownload from './pages/admin/AddDownload';
import DownloadList from './pages/admin/DownloadList';
import AddCircular from './pages/admin/AddCircular';
import CircularList from './pages/admin/CircularList';
import AddGallery from './pages/admin/AddGallery';
import GalleryList from './pages/admin/GalleryList';
import GalleryDetail from './pages/GalleryDetail';
import AddUser from './pages/admin/AddUser';
import UserList from './pages/admin/UserList';
import UserUpdates from './pages/admin/UserUpdates';
import ResetPasswordModal from './pages/admin/ResetPasswordModal';
import AdminList from './pages/admin/AdminList';
// import AdministrationReport from './pages/admin/AdministrationReport';
// import ParishList from './pages/admin/ParishList';
// import ParishReport from './pages/admin/ParishReport';
// import MainStatusList from './pages/admin/MainStatusList';
// import SecondaryStatusList from './pages/admin/SecondaryStatusList';
// import SecondarySubStatusList from './pages/admin/SecondarySubStatusList';
// import PriestList from './pages/admin/PriestList';
// import PriestReport from './pages/admin/PriestReport';
// import PriestHistoryReport from './pages/admin/PriestHistoryReport';
// import OtherPriestWorkingList from './pages/admin/OtherPriestWorkingList';
// import OtherPriestWorkingReport from './pages/admin/OtherPriestWorkingReport';

import AddStatistics from './pages/admin/AddStatistics';
import AddPastoralCouncil from './pages/admin/AddPastoralCouncil';
import PastoralCouncilDetail from "./pages/PastoralCouncilDetail";
import ImportData from './pages/admin/ImportData';
import PriestDetail from './pages/PriestDetail';
import ParishDetail from './pages/ParishDetail';
import DataViewer from './pages/admin/DataViewer';

function App() {
  const location = useLocation();

  // ✅ Hide Navbar & Footer for admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <AppNavbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/liturgical-calendar" element={<LiturgicalCalendar />} />
        <Route path="/circulars" element={<Circulars />} />

        <Route path="/our-patron" element={<OurPatron />} />
        <Route path="/history" element={<History />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/landmark" element={<Landmark />} />

        <Route path="/archbishop/mar-joseph-pamplany" element={<MarJosephPamplany />} />
        <Route path="/former-bishops/mar-george-njaralakatt" element={<MarGeorgeNjaralakatt />} />
        <Route path="/former-bishops/mar-george-valiamattam" element={<MarGeorgeValiamattam />} />
        <Route path="/former-bishops/mar-sebastian-valloppilly" element={<MarSebastianValloppilly />} />

        <Route path="/curia" element={<Curia />} />
        <Route path="/pastoral-council" element={<PastoralCouncil />} />
        <Route path="/presbyteral-council" element={<PresbyteralCouncil />} />
        <Route path="/tribunals" element={<ArcheparchialTribunal />} />
        <Route path="/other-committees" element={<OtherCommittees />} />

        <Route path="/foranes" element={<Foranes />} />
        <Route path="/parishes" element={<Parishes />} />
        <Route path="/filial-churches" element={<FilialChurches />} />

        <Route path="/archdiocesan-priests" element={<ArchdiocesanPriests />} />
        <Route path="/obituary" element={<Obituary />} />

        <Route path="/catechism" element={<CatechismDepartment />} />
        <Route path="/holy-childhood" element={<HolyChildhood />} />
        <Route path="/cherupushpa" element={<Cherupushpa />} />
        <Route path="/kcym" element={<KCYM />} />
        <Route path="/akcc" element={<AllKeralaCatholicCongress />} />
        <Route path="/kcbc" element={<KCBCMadyaVirudhaSamidhi />} />
        <Route path="/mukthisree" element={<Mukthisree />} />
        <Route path="/adsu" element={<AntiDrugsStudentsUnion />} />
        <Route path="/infam" element={<Infam />} />
        <Route path="/vincent-de-paul" element={<StVincentDePaul />} />
        <Route path="/sfo" element={<Sfo />} />
        <Route path="/family-apostolate" element={<FamilyApostolate />} />
        <Route path="/family-units" element={<FamilyUnits />} />
        <Route path="/internet-mission" element={<InternetMission />} />
        <Route path="/bible-apostolate" element={<BibleApostolate />} />
        <Route path="/media-apostolate" element={<MediaApostolate />} />
        <Route path="/sanjose-academy" element={<SanjoseAcademy />} />
        <Route path="/tsss" element={<TSSS />} />
        <Route path="/adam" element={<ADAM />} />
        <Route path="/alpha-institute" element={<AlphaInstitute />} />
        <Route path="/aifel" element={<AIFEL />} />
        <Route path="/trac" element={<TRAC />} />
        <Route path="/catholic-teachers-guild" element={<CatholicTeachersGuild />} />
        <Route path="/charismatic-movement" element={<CharismaticMovement />} />

        <Route path="/institution/educational" element={<EducationalInstitution />} />
        <Route path="/institution/social-charitable" element={<SocialCharitableInstitutions />} />

        <Route path="/congregations/men" element={<ReligiousHousesMen />} />
        <Route path="/religious-women" element={<ReligiousHousesWomen />} />

        <Route path="/downloads" element={<Downloads />} />
        <Route path="/downloads/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/downloads/bulletins" element={<Bulletins />} />
        <Route path="/downloads/photos" element={<PhotoGallery />} />
        <Route path="/photo-gallery/:id" element={<GalleryDetail />} />
        <Route path="/downloads/videos" element={<VideoGallery />} />
        <Route path="/downloads/calendar" element={<EventCalendar />} />
        <Route path="/downloads/websites" element={<ArchdiocesanWebsites />} />
        <Route path="/downloads/others" element={<OtherEcclesiasticalWebsites />} />

        <Route path="/vianney-fund" element={<VianneyNidhi />} />

        {/* ✅ Admin routes (no navbar/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/youtube-link-update" element={<AddYoutubeKeyvalue />} />
        <Route path="/admin/general/home-video" element={<AddHomeVideo />} />
        <Route path="/admin/general/program-diary" element={<UploadProgrammeDiary />} />
        <Route path="/admin/general/website-links" element={<WebsiteLinks />} />
        <Route path="/admin/general/news/add" element={<AddNews />} />
        <Route path="admin/general/news/list" element={<AdminNewsList />} />
        <Route path="/admin/general/bulletin/list" element={<BulletinList />} />
        <Route path="/admin/general/bulletin/add" element={<AddBulletin />} />
        <Route path="/admin/general/downloads/add" element={<AddDownload />} />
        <Route path="/admin/general/downloads/list" element={<DownloadList />} />
        <Route path="admin/general/circulars/add" element={<AddCircular />} />
        <Route path="/admin/general/circulars/list" element={<CircularList />} />
        <Route path="/admin/general/gallery/add" element={<AddGallery />} />
        <Route path="/admin/general/gallery/list" element={<GalleryList />} />
        <Route path="/admin/general/users/add" element={<AddUser />} />
        <Route path="/admin/general/users/list" element={<UserList />} />
        <Route path="/admin/general/users/update" element={<UserUpdates />} />
        <Route path="/reset-password" element={<ResetPasswordModal />} />
        <Route path="/admin/administration/list" element={<AdminList />} />
        <Route path="/admin/statistics/add" element={<AddStatistics />} />
        <Route path="/admin/pastoral/add" element={<AddPastoralCouncil />} />
        <Route path="/admin/dataview" element={<DataViewer />} />
        {/* <Route path="/pastoral-council/:id" element={<PastoralCouncilDetail />} /> */}

       <Route path="/pastoral-council/:id" element={<PastoralCouncilDetail />} />
       <Route path="/priests/:id" element={<PriestDetail />} />
       <Route path="/admin/tools/import" element={<ImportData />} />
       <Route path="/parish/:id" element={<ParishDetail />} />




        {/* <Route path="/admin/administration/report" element={<AdministrationReport />} />
        <Route path="/admin/parish/list" element={<ParishList />} />
        <Route path="/admin/parish/report" element={<ParishReport />} />
        <Route path="/admin/priest/status/main" element={<MainStatusList />} />
        <Route path="/admin/priest/status/secondary" element={<SecondaryStatusList />} />
        <Route path="/admin/priest/status/secondary-sub" element={<SecondarySubStatusList />} />
        <Route path="/admin/priest/list" element={<PriestList />} />
        <Route path="/admin/priest/report" element={<PriestReport />} />
        <Route path="/admin/priest/history-report" element={<PriestHistoryReport />} />
        <Route path="/admin/other-priest/list" element={<OtherPriestWorkingList />} />
        <Route path="/admin/other-priest/report" element={<OtherPriestWorkingReport />} /> */}





      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
