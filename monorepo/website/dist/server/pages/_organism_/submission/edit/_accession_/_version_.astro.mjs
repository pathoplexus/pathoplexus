/* empty css                                             */
import { a as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, F as Fragment$1, m as maybeRenderHead } from '../../../../../chunks/astro/server_BcdccBRb.mjs';
import 'kleur/colors';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { E as EditableMetadata, a as EditableSequences, S as Subtitle, b as SubmissionIdRow, M as MetadataForm, c as SequencesForm } from '../../../../../chunks/SequencesForm_BqEDMvJC.mjs';
import { g as getClientLogger } from '../../../../../chunks/clientLogger_iKuJ-UyB.mjs';
import { r as routes } from '../../../../../chunks/routes_BftQyUXo.mjs';
import { b as backendClientHooks } from '../../../../../chunks/serviceHooks_DslcN1kS.mjs';
import { ag as approvedForReleaseStatus, h as getGroupedInputFields, a as getRuntimeConfig, j as getSchema, T as getReferenceGenomesSequenceNames } from '../../../../../chunks/config_CQtV1zSN.mjs';
import { a as createAuthorizationHeader, c as createBackendClient } from '../../../../../chunks/backendClientFactory_DhWS0NBG.mjs';
import { g as getAccessionVersionString } from '../../../../../chunks/extractAccessionVersion_CIVou_Oi.mjs';
import { d as displayConfirmationDialog } from '../../../../../chunks/ConfirmationDialog_BWzbBNGK.mjs';
import { w as withQueryProvider } from '../../../../../chunks/withQueryProvider_BqTp-ccD.mjs';
import { c as cleanOrganism } from '../../../../../chunks/cleanOrganism_Dc4DF_FJ.mjs';
import { $ as $$BaseLayout } from '../../../../../chunks/BaseLayout_C5Fsgcd-.mjs';
import { g as getAccessToken } from '../../../../../chunks/getAccessToken_D0lD1so3.mjs';
export { renderers } from '../../../../../renderers.mjs';

const logger = getClientLogger("EditPage");
const InnerEditPage = ({
  organism,
  dataToEdit,
  segmentNames,
  clientConfig,
  accessToken,
  groupedInputFields,
  submissionDataTypes
}) => {
  const [editableMetadata, setEditableMetadata] = useState(EditableMetadata.fromInitialData(dataToEdit));
  const [editableSequences, setEditableSequences] = useState(
    EditableSequences.fromInitialData(dataToEdit, segmentNames)
  );
  const isCreatingRevision = dataToEdit.status === approvedForReleaseStatus;
  const { mutate: submitRevision, isLoading: isRevisionLoading } = useSubmitRevision(
    organism,
    clientConfig,
    accessToken,
    dataToEdit,
    (message) => toast.error(message, { position: "top-center", autoClose: false })
  );
  const { mutate: submitEdit, isLoading: isEditLoading } = useSubmitEdit(
    organism,
    clientConfig,
    accessToken,
    dataToEdit,
    (message) => toast.error(message, { position: "top-center", autoClose: false })
  );
  const submitEditedDataForAccessionVersion = () => {
    const metadataFile = editableMetadata.getMetadataTsv(dataToEdit.submissionId, dataToEdit.accession);
    if (metadataFile === void 0) {
      toast.error("Please enter metadata.", { position: "top-center", autoClose: false });
      return;
    }
    if (isCreatingRevision) {
      submitRevision({
        metadataFile,
        sequenceFile: submissionDataTypes.consensusSequences ? editableSequences.getSequenceFasta(dataToEdit.submissionId) : void 0
      });
    } else {
      submitEdit({
        accession: dataToEdit.accession,
        version: dataToEdit.version,
        data: {
          metadata: editableMetadata.getMetadataRecord(),
          unalignedNucleotideSequences: editableSequences.getSequenceRecord()
        }
      });
    }
  };
  const isLoading = isRevisionLoading || isEditLoading;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center mb-4", children: /* @__PURE__ */ jsxs("h1", { className: "title", children: [
      isCreatingRevision ? "Create new revision from" : "Edit",
      " ",
      dataToEdit.accession,
      ".",
      dataToEdit.version
    ] }) }),
    /* @__PURE__ */ jsx("table", { className: "customTable", children: /* @__PURE__ */ jsxs("tbody", { className: "w-full", children: [
      /* @__PURE__ */ jsx(Subtitle, { title: "Original data", bold: true }),
      /* @__PURE__ */ jsx(SubmissionIdRow, { submissionId: dataToEdit.submissionId }),
      /* @__PURE__ */ jsx(
        MetadataForm,
        {
          editableMetadata,
          setEditableMetadata,
          groupedInputFields
        }
      )
    ] }) }),
    submissionDataTypes.consensusSequences && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-4", children: /* @__PURE__ */ jsx(
      SequencesForm,
      {
        editableSequences,
        setEditableSequences,
        dataToEdit,
        isLoading
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 mt-4", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "btn normal-case",
        onClick: () => displayConfirmationDialog({
          dialogText: "Do you really want to submit?",
          onConfirmation: submitEditedDataForAccessionVersion
        }),
        disabled: isLoading,
        children: [
          isLoading && /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-sm mr-2" }),
          "Submit"
        ]
      }
    ) })
  ] });
};
const EditPage = withQueryProvider(InnerEditPage);
function useSubmitRevision(organism, clientConfig, accessToken, reviewData, openErrorFeedback) {
  return backendClientHooks(clientConfig).useRevise(
    {
      params: { organism },
      headers: createAuthorizationHeader(accessToken)
    },
    {
      onSuccess: async () => {
        await logger.info("Successfully submitted revision for " + getAccessionVersionString(reviewData));
        location.href = routes.userSequenceReviewPage(organism, reviewData.groupId);
      },
      onError: async (error) => {
        const message = `Failed to submit revision for ${getAccessionVersionString(
          reviewData
        )} with error '${JSON.stringify(error)})}'`;
        await logger.info(message);
        openErrorFeedback(message);
      }
    }
  );
}
function useSubmitEdit(organism, clientConfig, accessToken, reviewData, openErrorFeedback) {
  return backendClientHooks(clientConfig).useSubmitReviewedSequence(
    {
      headers: createAuthorizationHeader(accessToken),
      params: { organism }
    },
    {
      onSuccess: async () => {
        await logger.info("Successfully submitted edited data " + getAccessionVersionString(reviewData));
        location.href = routes.userSequenceReviewPage(organism, reviewData.groupId);
      },
      onError: async (error) => {
        const message = `Failed to submit edited data for ${getAccessionVersionString(
          reviewData
        )} with error '${JSON.stringify(error)})}'`;
        await logger.info(message);
        openErrorFeedback(message);
      }
    }
  );
}

const $$Astro = createAstro();
const $$version = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$version;
  const version = Astro2.params.version;
  const accession = Astro2.params.accession;
  const organism = Astro2.params.organism;
  const { organism: cleanedOrganism } = cleanOrganism(Astro2.params.organism);
  if (!cleanedOrganism) {
    return {
      statusCode: 404,
      body: "Organism not found"
    };
  }
  const groupedInputFields = getGroupedInputFields(cleanedOrganism.key, "revise", true);
  const accessToken = getAccessToken(Astro2.locals.session);
  const clientConfig = getRuntimeConfig().public;
  const schema = getSchema(organism);
  const segmentNames = getReferenceGenomesSequenceNames(organism).nucleotideSequences;
  const dataToEdit = await createBackendClient().getDataToEdit(organism, accessToken, accession, version);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Edit ${accession}.${version}` }, { "default": async ($$result2) => renderTemplate`${dataToEdit.match(
    (dataToEdit2) => renderTemplate`${renderComponent($$result2, "EditPage", EditPage, { "organism": organism, "accessToken": accessToken, "dataToEdit": dataToEdit2, "segmentNames": segmentNames, "clientConfig": clientConfig, "groupedInputFields": groupedInputFields, "submissionDataTypes": schema.submissionDataTypes, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/components/Edit/EditPage", "client:component-export": "EditPage" })}`,
    (error) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center"> <h1 class="subtitle">
Error while fetching edited data for accession version: ${accession}.${version} </h1> </div> <div>${JSON.stringify(error)}</div> ` })}`
  )}` })}`;
}, "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/edit/[accession]/[version].astro", void 0);

const $$file = "/home/runner/work/pathoplexus/pathoplexus/monorepo/website/src/pages/[organism]/submission/edit/[accession]/[version].astro";
const $$url = "/[organism]/submission/edit/[accession]/[version]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$version,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
