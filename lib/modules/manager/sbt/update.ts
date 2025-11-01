import type { ReleaseType } from 'semver';
import semver from 'semver';
import { logger } from '../../../logger';
import { escapeRegExp, regEx } from '../../../util/regex';
import type {
  BumpPackageVersionResult,
  UpdateDependencyConfig,
  Upgrade,
} from '../types';

export function bumpPackageVersion(
  content: string,
  currentValue: string,
  bumpVersion: ReleaseType,
): BumpPackageVersionResult {
  logger.debug(
    { bumpVersion, currentValue },
    'Checking if we should bump build.sbt version',
  );
  let bumpedContent = content;
  const bumpedVersion = semver.inc(currentValue, bumpVersion);
  if (!bumpedVersion) {
    logger.warn('Version incremental failed');
    return { bumpedContent };
  }
  bumpedContent = content.replace(
    regEx(/^(version\s*:=\s*).*$/m),
    `$1"${bumpedVersion}"`,
  );

  if (bumpedContent === content) {
    logger.debug('Version was already bumped');
  } else {
    logger.debug(`Bumped build.sbt version to ${bumpedVersion}`);
  }

  return { bumpedContent };
}

/*

     "mode": "full",
       "detectGlobalManagerConfig": false,
       "detectHostRulesFromEnv": false,
       "useCloudMetadataServices": true,
       "bumpVersions": [],
       "postUpgradeTasks": {"commands": [], "fileFilters": [], "executionMode": "update"},
       "onboardingBranch": "renovate/configure",
       "onboardingCommitMessage": null,
       "configFileNames": null,
       "onboardingConfigFileName": "renovate.json",
       "onboardingNoDeps": "enabled",
       "onboardingPrTitle": "Configure Renovate",
       "productLinks": {
         "documentation": "https://docs.renovatebot.com/",
         "help": "https://github.com/renovatebot/renovate/discussions",
         "homepage": "https://github.com/renovatebot/renovate"
       },
       "statusCheckNames": {
         "artifactError": "renovate/artifacts",
         "configValidation": "renovate/config-validation",
         "mergeConfidence": "renovate/merge-confidence",
         "minimumReleaseAge": "renovate/stability-days"
       },
       "minimumGroupSize": 1,
       "globalExtends": [],
       "constraintsFiltering": "none",
       "reportType": null,
       "reportPath": null,
       "draftPR": false,
       "printConfig": false,
       "customDatasources": {},
       "composerIgnorePlatformReqs": [],
       "goGetDirs": ["./..."],
       "onboardingRebaseCheckbox": false,
       "includeMirrors": false,
       "inheritConfig": false,
       "inheritConfigRepoName": "{{parentOrg}}/renovate-config",
       "inheritConfigFileName": "org-inherited-config.json",
       "inheritConfigStrict": false,
       "dependencyDashboard": false,
       "dependencyDashboardApproval": false,
       "dependencyDashboardAutoclose": false,
       "dependencyDashboardTitle": "Dependency Dashboard",
       "dependencyDashboardCategory": null,
       "dependencyDashboardHeader": "This issue lists Renovate updates and detected dependencies. Read the [Dependency Dashboard](https://docs.renovatebot.com/key-concepts/dashboard/) docs to learn more.",
       "dependencyDashboardFooter": null,
       "dependencyDashboardLabels": null,
       "dependencyDashboardOSVVulnerabilitySummary": "none",
       "configWarningReuseIssue": false,
       "timezone": null,
       "schedule": ["at any time"],
       "automergeSchedule": ["at any time"],
       "updateNotScheduled": true,
       "persistRepoData": false,
       "ignorePlugins": false,
       "ignoreScripts": true,
       "npmrc": null,
       "npmrcMerge": false,
       "npmToken": null,
       "skipArtifactsUpdate": false,
       "skipInstalls": null,
       "useBaseBranchConfig": "none",
       "gitAuthor": undefined,
       "excludeCommitPaths": [],
       "registryAliases": {},
       "defaultRegistryUrls": null,
       "registryUrls": ["https://repo.maven.apache.org/maven2"],
       "extractVersion": null,
       "versionCompatibility": null,
       "versioning": "ivy",
       "azureWorkItemId": 0,
       "autoApprove": false,
       "autoReplaceGlobalMatch": true,
       "replacementApproach": "replace",
       "pinDigests": false,
       "separateMajorMinor": true,
       "separateMinorPatch": false,
       "rangeStrategy": "auto",
       "branchPrefix": "renovate/",
       "branchPrefixOld": "renovate/",
       "bumpVersion": null,
       "semanticCommits": "disabled",
       "semanticCommitType": "chore",
       "semanticCommitScope": "deps",
       "commitMessageLowerCase": "auto",
       "keepUpdatedLabel": null,
       "rollbackPrs": false,
       "recreateWhen": "auto",
       "rebaseWhen": "auto",
       "rebaseLabel": "rebase",
       "stopUpdatingLabel": "stop-updating",
       "minimumReleaseAge": null,
       "minimumReleaseAgeBehaviour": "timestamp-optional",
       "abandonmentThreshold": null,
       "dependencyDashboardReportAbandonment": true,
       "internalChecksAsSuccess": false,
       "internalChecksFilter": "strict",
       "prCreation": "immediate",
       "prNotPendingHours": 25,
       "prHourlyLimit": 2,
       "prConcurrentLimit": 10,
       "branchConcurrentLimit": null,
       "bbAutoResolvePrTasks": false,
       "bbUseDefaultReviewers": true,
       "bbUseDevelopmentBranch": false,
       "automerge": false,
       "automergeType": "pr",
       "automergeStrategy": "auto",
       "automergeComment": "automergeComment",
       "ignoreTests": false,
       "osvVulnerabilityAlerts": false,
       "pruneBranchAfterAutomerge": true,
       "branchName": "renovate/org.scalatestplus-mockito-3-12-replacement",
       "additionalBranchPrefix": "",
       "branchTopic": "{{{depNameSanitized}}}-replacement",
       "commitMessage": "{{{commitMessagePrefix}}} {{{commitMessageAction}}} {{{commitMessageTopic}}} {{{commitMessageExtra}}} {{{commitMessageSuffix}}}",
       "commitBody": null,
       "commitBodyTable": false,
       "commitMessagePrefix": null,
       "commitMessageAction": "Replace",
       "commitMessageTopic": "dependency {{depName}}",
       "commitMessageExtra": "with {{newName}} {{#if isMajor}}{{{prettyNewMajor}}}{{else}}{{#if isSingleVersion}}{{{prettyNewVersion}}}{{else}}{{{newValue}}}{{/if}}{{/if}}",
       "commitMessageSuffix": null,
       "prBodyTemplate": "{{{header}}}{{{table}}}{{{warnings}}}{{{notes}}}{{{changelogs}}}{{{configDescription}}}{{{controls}}}{{{footer}}}",
       "prTitle": null,
       "prTitleStrict": false,
       "prHeader": null,
       "prFooter": "This PR has been generated by [Renovate Bot](https://github.com/renovatebot/renovate).",
       "customizeDashboard": {},
       "hashedBranchLength": null,
       "groupSlug": null,
       "labels": [],
       "addLabels": [],
       "assignees": [],
       "assigneesFromCodeOwners": false,
       "expandCodeOwnersGroups": false,
       "assigneesSampleSize": null,
       "assignAutomerge": false,
       "ignoreReviewers": [],
       "reviewers": [],
       "reviewersFromCodeOwners": false,
       "filterUnavailableUsers": false,
       "forkModeDisallowMaintainerEdits": false,
       "confidential": false,
       "reviewersSampleSize": null,
       "additionalReviewers": [],
       "postUpdateOptions": [],
       "constraints": {},
       "prBodyDefinitions": {
         "Package": "{{{depNameLinked}}}{{#if newName}}{{#unless (equals depName newName)}} → {{{newNameLinked}}}{{/unless}}{{/if}}",
         "Type": "{{{depType}}}",
         "Update": "{{{updateType}}}",
         "Current value": "{{{currentValue}}}",
         "New value": "{{{newValue}}}",
         "Change": "`{{{displayFrom}}}` -> `{{{displayTo}}}`",
         "Pending": "{{{displayPending}}}",
         "References": "{{{references}}}",
         "Package file": "{{{packageFile}}}",
         "Age": "{{#if newVersion}}[![age](https://developer.mend.io/api/mc/badges/age/{{datasource}}/{{replace '/' '%2f' packageName}}/{{{newVersion}}}?slim=true)](https://docs.renovatebot.com/merge-confidence/){{/if}}",
         "Adoption": "{{#if newVersion}}[![adoption](https://developer.mend.io/api/mc/badges/adoption/{{datasource}}/{{replace '/' '%2f' packageName}}/{{{newVersion}}}?slim=true)](https://docs.renovatebot.com/merge-confidence/){{/if}}",
         "Passing": "{{#if newVersion}}[![passing](https://developer.mend.io/api/mc/badges/compatibility/{{datasource}}/{{replace '/' '%2f' packageName}}/{{{currentVersion}}}/{{{newVersion}}}?slim=true)](https://docs.renovatebot.com/merge-confidence/){{/if}}",
         "Confidence": "{{#if newVersion}}[![confidence](https://developer.mend.io/api/mc/badges/confidence/{{datasource}}/{{replace '/' '%2f' packageName}}/{{{currentVersion}}}/{{{newVersion}}}?slim=true)](https://docs.renovatebot.com/merge-confidence/){{/if}}"
       },
       "prBodyColumns": ["Package", "Type", "Update", "Change", "Pending"],
       "prBodyNotes": [
         "This is a special PR that replaces `{{{depName}}}` with the community suggested minimal stable replacement version."
       ],
       "suppressNotifications": [],
       "pruneStaleBranches": true,
       "unicodeEmoji": true,
       "gitLabIgnoreApprovals": false,
       "fetchChangeLogs": "pr",
       "cloneSubmodules": false,
       "cloneSubmodulesFilter": ["*"],
       "updatePinnedDependencies": true,
       "writeDiscoveredRepos": null,
       "platformAutomerge": true,
       "userStrings": {
         "ignoreTopic": "Renovate Ignore Notification",
         "ignoreMajor": "Because you closed this PR without merging, Renovate will ignore this update. You will not get PRs for *any* future `{{{newMajor}}}.x` releases. But if you manually upgrade to `{{{newMajor}}}.x` then Renovate will re-enable `minor` and `patch` updates automatically.",
         "ignoreDigest": "Because you closed this PR without merging, Renovate will ignore this update. You will not get PRs for the `{{{depName}}}` `{{{newDigestShort}}}` update again.",
         "ignoreOther": "Because you closed this PR without merging, Renovate will ignore this update (`{{{newValue}}}`). You will get a PR once a newer version is released. To ignore this dependency forever, add it to the `ignoreDeps` array of your Renovate config.",
         "artifactErrorWarning": "You probably do not want to merge this PR as-is."
       },
       "platformCommit": "auto",
       "branchNameStrict": false,
       "checkedBranches": [],
       "milestone": null,
       "deleteConfigFile": false,
       "deleteAdditionalConfigFile": false,
       "renovateUsername": "gaeljw",
       "parentOrg": "gaeljw",
       "topLevelOrg": "gaeljw",
       "errors": [],
       "warnings": [],
       "branchList": [],
       "defaultBranch": "main",
       "isFork": false,
       "repoFingerprint": "1c2e5879fed809f43b2d11ee9226a917a2a1fb3ff06897417429e34e87bb444e606b3a05489f8bb353c19f501bdee9e268b1a48a11f698eb438e00085895386a",
       "repoIsOnboarded": true,
       "$schema": "https://docs.renovatebot.com/renovate-schema.json",
       "renovateJsonPresent": true,
       "dependencyDashboardChecks": {},
       "dependencyDashboardAllPending": false,
       "dependencyDashboardRebaseAllOpen": false,
       "dependencyDashboardAllRateLimited": false,
       "manager": "sbt",
       "categories": ["java"],
       "parentDir": "",
       "packageFileDir": "",
       "datasource": "sbt-package",
       "depName": "org.scalatestplus:mockito-3-12",
       "packageName": "org.scalatestplus:mockito-3-12_2.13",
       "currentValue": "3.2.10.0",
       "sourceUrl": "https://github.com/scalatest/scalatestplus-mockito",
       "registryUrl": "https://repo.maven.apache.org/maven2",
       "dependencyUrl": "https://repo.maven.apache.org/maven2/org/scalatestplus",
       "currentVersion": "3.2.10.0",
       "currentVersionTimestamp": "2021-09-17T01:55:10.000Z",
       "currentVersionAgeInDays": 1506,
       "fixedVersion": "3.2.10.0",
       "depIndex": 1,
       "updateType": "replacement",
       "newName": "org.scalatestplus:mockito-4-11_2.13",
       "newValue": "3.12.16.0",
       "isReplacement": true,
       "depNameSanitized": "org.scalatestplus-mockito-3-12",
       "newNameSanitized": "org.scalatestplus-mockito-4-11_2.13",
       "sourceRepoSlug": "scalatest-scalatestplus-mockito",
       "sourceRepo": "scalatest/scalatestplus-mockito",
       "sourceRepoOrg": "scalatest",
       "sourceRepoName": "scalatestplus-mockito",
       "baseDeps": [
         {
           "datasource": "maven",
           "depName": "scala",
           "packageName": "org.scala-lang:scala-library",
           "currentValue": "2.13.17",
           "separateMinorPatch": true,
           "registryUrls": ["https://repo.maven.apache.org/maven2"],
           "updates": [],
           "versioning": "ivy",
           "warnings": [],
           "sourceUrl": "https://github.com/scala/scala",
           "registryUrl": "https://repo.maven.apache.org/maven2",
           "homepage": "https://www.scala-lang.org/",
           "packageScope": "org.scala-lang",
           "respectLatest": false,
           "currentVersion": "2.13.17",
           "currentVersionTimestamp": "2025-09-30T07:19:40.000Z",
           "currentVersionAgeInDays": 32,
           "fixedVersion": "2.13.17"
         },
         {
           "datasource": "sbt-package",
           "depName": "org.scalatestplus:mockito-3-12",
           "packageName": "org.scalatestplus:mockito-3-12_2.13",
           "currentValue": "3.2.10.0",
           "registryUrls": ["https://repo.maven.apache.org/maven2"],
           "updates": [
             {
               "updateType": "replacement",
               "newName": "org.scalatestplus:mockito-4-11_2.13",
               "newValue": "3.12.16.0",
               "branchName": "renovate/org.scalatestplus-mockito-3-12-replacement"
             }
           ],
           "versioning": "ivy",
           "warnings": [],
           "sourceUrl": "https://github.com/scalatest/scalatestplus-mockito",
           "registryUrl": "https://repo.maven.apache.org/maven2",
           "dependencyUrl": "https://repo.maven.apache.org/maven2/org/scalatestplus",
           "currentVersion": "3.2.10.0",
           "currentVersionTimestamp": "2021-09-17T01:55:10.000Z",
           "currentVersionAgeInDays": 1506,
           "fixedVersion": "3.2.10.0"
         }
       ],
       "recreateClosed": false,
       "displayFrom": "3.2.10.0",
       "displayTo": "3.12.16.0",
       "depTypes": undefined,
       "displayPending": "",
       "prettyDepType": "dependency"

*/

/*
       scalaVersion := "2.13.17"

       libraryDependencies += "org.scalatestplus" %% "mockito-3-12" % "3.2.10.0"
*/

export function updateDependency({
  fileContent,
  upgrade,
}: UpdateDependencyConfig): string | null {
  const { depName, newName, currentValue, newValue } = upgrade;

  if (newName) {
    const [oldGroupId, oldArtifactId] = depName!.split(':', 2);
    const [newGroupId, newArtifactId] = newName.split(':', 2);

    if (newValue) {
      const pattern = new RegExp(
        `"${escapeRegExp(oldGroupId)}"\\s*(%%?)\\s*"${escapeRegExp(oldArtifactId)}"\\s*%\\s*"${escapeRegExp(currentValue!)}"`,
        'g',
      );

      const updatedContent = fileContent.replace(
        pattern,
        (match, percentSigns) => {
          return `"${newGroupId}" ${percentSigns} "${newArtifactId}" % "${newValue}"`;
        },
      );

      return updatedContent;
    } else {
      const pattern = new RegExp(
        `"${escapeRegExp(oldGroupId)}"\\s*(%%?)\\s*"${escapeRegExp(oldArtifactId)}"`,
        'g',
      );

      const updatedContent = fileContent.replace(
        pattern,
        (match, percentSigns) => {
          return `"${newGroupId}" ${percentSigns} "${newArtifactId}"`;
        },
      );

      return updatedContent;
    }
  }

  logger.debug(
    { depName, newName, currentValue, newValue },
    'Unable to apply replacement',
  );

  return null;
}
