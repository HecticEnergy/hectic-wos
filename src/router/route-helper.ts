import type { Router } from 'vue-router';

enum Routes {
  HOME = '/',
  MARCH_TIME_NEW = '/MarchTimesNewPage',
  MINISTRY_APPOINTMENTS = '/MinistryAppointments',
}

const HOME = Routes.HOME;
const MARCH_TIME_NEW = Routes.MARCH_TIME_NEW;
const MINISTRY_APPOINTMENTS = Routes.MINISTRY_APPOINTMENTS;

// const formatPrintPuppyCertificateUrl = (pupIds: string[]) => {
//   const queryString = pupIds.toString().replace(/"|\[|\]/g, '');
//   return `${PRINT}?view=pup&pupIds=${queryString}`;
// };

// const unformatPrintPuppyCertificateUrl = (
//   pupIdsQueryString: string
// ): string[] => {
//   const pupIds = `["${pupIdsQueryString.toString().split(',').join('","')}"]`;
//   return JSON.parse(pupIds);
// };

const openInNewTab = (router: Router, to: string): boolean => {
  const openNewTab = localStorage.getItem('newTabsDisabled');
  if (openNewTab === null || openNewTab === 'false') {
    const routeData = router.resolve(to);
    window.open(routeData.href, '_blank');
    const showAlert = localStorage.getItem('showPopupEnableAlert');

    if (showAlert === null || showAlert === 'true') {
      const continueToShowAlert = confirm(
        'Did the new tab open? - Print view should be opened in a new tab. If not, you may need to enable popups for this site.' +
          " - 'Ok' to close this and continue. - 'Cancel' to stay here and try again."
      );
      localStorage.setItem('showPopupEnableAlert', `${!continueToShowAlert}`);
      return !continueToShowAlert;
    }
  } else {
    router.push(to);
    return true;
  }

  return true;
};


export default {
  HOME,
  MARCH_TIME_NEW,
  MINISTRY_APPOINTMENTS,
  // formatPrintPuppyCertificateUrl,
  // unformatPrintPuppyCertificateUrl,
  openInNewTab,
};
