import {
    WMSServiceImage,
    WMSServiceImageLink,
    WMSServiceImagesContainer,
    WMSServicesContainer,
    WMSServicesHeader,
} from './WMSServices.style';
import jenkinsLogo from '../../assets/logos/jenkins.png';
import grafanaLogo from '../../assets/logos/grafana.png';
import sentryLogo from '../../assets/logos/sentry.png';

const JENKINS_URL = 'https://jenkins.tools.wmsdev.pl';
const GRAFANA_URL = 'https://grafana.team.wmsdev.pl';
const SENTRY_URL = 'https://sentry.team.wmsdev.pl';

const WMSServices = () => {
    return (
        <WMSServicesContainer>
            <WMSServicesHeader>Use your account to access:</WMSServicesHeader>
            <WMSServiceImagesContainer>
                <WMSServiceImageLink href={JENKINS_URL}>
                    <WMSServiceImage src={jenkinsLogo} />
                </WMSServiceImageLink>
                <WMSServiceImageLink href={GRAFANA_URL}>
                    <WMSServiceImage src={grafanaLogo} />
                </WMSServiceImageLink>
                <WMSServiceImageLink href={SENTRY_URL}>
                    <WMSServiceImage src={sentryLogo} />
                </WMSServiceImageLink>
            </WMSServiceImagesContainer>
        </WMSServicesContainer>
    );
};

export default WMSServices;
