export default function l20nMessage(messageId, fallbackMessage) {
    try {
      return document.l10n.getSync(messageId);
    } catch (err) {
        return fallbackMessage;
    }
}
