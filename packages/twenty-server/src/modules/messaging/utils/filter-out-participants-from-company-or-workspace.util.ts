import { Participant } from 'src/modules/messaging/types/gmail-message';
import { getDomainNameFromHandle } from 'src/modules/messaging/utils/get-domain-name-from-handle.util';
import { WorkspaceMemberObjectMetadata } from 'src/modules/workspace-member/standard-objects/workspace-member.object-metadata';
import { ObjectRecord } from 'src/engine/workspace-manager/workspace-sync-metadata/types/object-record';

export function filterOutParticipantsFromCompanyOrWorkspace(
  participants: Participant[],
  selfHandle: string,
  workspaceMembers: ObjectRecord<WorkspaceMemberObjectMetadata>[],
): Participant[] {
  const selfDomainName = getDomainNameFromHandle(selfHandle);

  const workspaceMembersMap = workspaceMembers.reduce(
    (map, workspaceMember) => {
      map[workspaceMember.userEmail] = true;

      return map;
    },
    new Map<string, boolean>(),
  );

  return participants.filter(
    (participant) =>
      getDomainNameFromHandle(participant.handle) !== selfDomainName &&
      !workspaceMembersMap[participant.handle],
  );
}
